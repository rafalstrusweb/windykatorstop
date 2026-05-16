import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type LawyerPayload = {
  name: string;
  title: string;
  barNo: string;
  email: string;
  phone?: string;
  city: string;
  specializations: string[];
  website?: string;
  notes?: string;
};

export async function POST(req: NextRequest) {
  let data: LawyerPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!data.email || !data.name || !data.barNo || !data.city || !data.specializations?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const summary = [
    `Czas: ${new Date().toISOString()}`,
    ``,
    `Prawnik:`,
    `  Imie: ${data.name}`,
    `  Tytul: ${data.title}`,
    `  Numer wpisu: ${data.barNo}`,
    `  Miasto: ${data.city}`,
    `  Email: ${data.email}`,
    `  Telefon: ${data.phone || "-"}`,
    `  Www: ${data.website || "-"}`,
    ``,
    `Specjalizacje:`,
    ...data.specializations.map((s) => `  - ${s}`),
    ``,
    `Notatki: ${data.notes || "-"}`,
  ].join("\n");

  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "WindykatorStop <signup@windykatorstop.pl>",
          to: [process.env.ADMIN_EMAIL],
          subject: `[Prawnik] Nowe zgloszenie: ${data.name} (${data.city})`,
          text: summary,
        }),
      });
    } catch (err) {
      console.error("Lawyer signup email error:", err);
    }
  } else {
    console.log("=== LAWYER SIGNUP ===\n" + summary);
  }

  return NextResponse.json({ ok: true });
}
