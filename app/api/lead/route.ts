import { NextRequest, NextResponse } from "next/server";

// ─── Lead intake API ─────────────────────────────────────────────────────────
// Receives case-assessment leads. Forwards to admin email + (later) to matched lawyer.
// Resend integration is optional — falls back to console logging if no API key.

export const runtime = "edge";

type LeadPayload = {
  contact: { name: string; email: string; phone?: string; city?: string; consent: boolean };
  answers: Record<string, string>;
  score: number;
  riskLevel: "low" | "medium" | "high";
};

export async function POST(req: NextRequest) {
  let data: LeadPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!data.contact?.email || !data.contact?.name || !data.contact?.consent) {
    return NextResponse.json({ error: "Missing required fields or consent" }, { status: 400 });
  }

  const timestamp = new Date().toISOString();
  const subject = `[Lead] ${data.riskLevel.toUpperCase()} - ${data.contact.name}`;
  const summary = formatLead(data, timestamp);

  // Try Resend if configured
  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
    try {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "WindykatorStop <leads@windykatorstop.pl>",
          to: [process.env.ADMIN_EMAIL],
          subject,
          text: summary,
        }),
      });
      if (!resp.ok) console.error("Resend failed:", await resp.text());
    } catch (err) {
      console.error("Lead email error:", err);
    }
  } else {
    // Fallback: structured log (visible in Vercel dashboard)
    console.log("=== NEW LEAD ===\n" + summary);
  }

  return NextResponse.json({ ok: true });
}

function formatLead(d: LeadPayload, ts: string) {
  return [
    `Czas: ${ts}`,
    `Poziom zlozonosci: ${d.riskLevel.toUpperCase()} (score: ${d.score})`,
    ``,
    `Kontakt:`,
    `  Imie: ${d.contact.name}`,
    `  Email: ${d.contact.email}`,
    `  Telefon: ${d.contact.phone || "-"}`,
    `  Miejscowosc: ${d.contact.city || "-"}`,
    ``,
    `Odpowiedzi z ekspertyzy:`,
    ...Object.entries(d.answers).map(([k, v]) => `  ${k}: ${v}`),
  ].join("\n");
}
