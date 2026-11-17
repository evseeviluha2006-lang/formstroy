import { NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  consent?: unknown;
};

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { error: "Некорректный формат запроса" },
      { status: 400 },
    );
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const consent = payload.consent === true;
  const phoneDigits = phone.replace(/\D/g, "");

  if (
    name.length < 2 ||
    name.length > 120 ||
    phoneDigits.length !== 11 ||
    !consent
  ) {
    return NextResponse.json(
      { error: "Проверьте имя, номер телефона и согласие" },
      { status: 400 },
    );
  }

  const lead = {
    name,
    phone,
    consent,
    source: "favorit-stroy-landing",
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        cache: "no-store",
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          { error: "CRM временно недоступна" },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Не удалось передать заявку" },
        { status: 502 },
      );
    }
  } else {
    // Без LEAD_WEBHOOK_URL заявка сохраняется в логах сервера.
    // Для боевого сайта подключите CRM, Telegram Bot API или почтовый сервис.
    console.info("[favorit-stroy] new lead", lead);
  }

  return NextResponse.json({ ok: true });
}
