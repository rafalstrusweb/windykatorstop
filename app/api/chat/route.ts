import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages, system } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { content: "Asystent AI jest chwilowo niedostępny. Sprawdź nasze artykuły i narzędzia powyżej." },
      { status: 200 }
    );
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { content: "Przepraszam za problem techniczny. Spróbuj ponownie za chwilę." },
      { status: 200 }
    );
  }

  const data = await res.json();
  const content = data.content?.[0]?.text ?? "Przepraszam, nie mogłem przetworzyć odpowiedzi.";

  return NextResponse.json({ content });
}
