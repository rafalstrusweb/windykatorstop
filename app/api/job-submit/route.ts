import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type JobSubmit = {
  employerName: string;
  employerEmail: string;
  company: string;
  title: string;
  location: string;
  region: string;
  type: string;
  category: string;
  description: string;
  note: string;
  contact: string;
  contactType: "email" | "phone";
  noCheckCredit: boolean;
  quickStart: boolean;
  consent: boolean;
};

export async function POST(req: NextRequest) {
  let data: JobSubmit;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!data.consent) {
    return NextResponse.json({ error: "Brak zgody" }, { status: 400 });
  }
  if (!data.company || !data.title || !data.location || !data.description || !data.contact) {
    return NextResponse.json({ error: "Brakuje wymaganych pol" }, { status: 400 });
  }

  const summary = [
    `Czas: ${new Date().toISOString()}`,
    ``,
    `Pracodawca:`,
    `  Imie: ${data.employerName}`,
    `  Email: ${data.employerEmail}`,
    `  Firma: ${data.company}`,
    ``,
    `Ogloszenie:`,
    `  Stanowisko: ${data.title}`,
    `  Miejscowosc: ${data.location} (${data.region})`,
    `  Typ: ${data.type} / ${data.category}`,
    `  Opis: ${data.description}`,
    `  Notatka: ${data.note || "-"}`,
    `  Kontakt: ${data.contact} (${data.contactType})`,
    `  Bez BIK/KRD: ${data.noCheckCredit ? "TAK" : "NIE"}`,
    `  Szybki start: ${data.quickStart ? "TAK" : "NIE"}`,
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
          from: "WindykatorStop <jobs@windykatorstop.pl>",
          to: [process.env.ADMIN_EMAIL],
          subject: `[Praca] ${data.company} - ${data.title} (${data.location})`,
          text: summary,
        }),
      });
    } catch (err) {
      console.error("Job submit email error:", err);
    }
  } else {
    console.log("=== JOB SUBMIT ===\n" + summary);
  }

  return NextResponse.json({ ok: true });
}
