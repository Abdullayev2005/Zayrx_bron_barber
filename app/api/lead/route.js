export async function POST(req) {
  try {
    const data = await req.json();

    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    if (!token || !chatId) {
      return Response.json(
        { ok: false, error: "TG_BOT_TOKEN yoki TG_CHAT_ID topilmadi" },
        { status: 500 }
      );
    }

    const safe = (v) => String(v ?? "").trim();

    const text =
`🔥 Yangi lead

Biznes turi: ${safe(data.businessType)}
Ism: ${safe(data.firstName)}
Familiya: ${safe(data.lastName)}
Telefon: ${safe(data.phone)}
Biznes nomi: ${safe(data.businessName)}
Filiallar soni: ${safe(data.branchesCount)}
Qo‘shimcha: ${safe(data.extra) || "yo‘q"}

Paket: Setup $300 | Yillik $100 (server+domen+backup+update+support)
Shartlar: 1 hafta | shartnoma | to‘lov oldindan
Bonus: statik sayt ham (branding bilan)`;

    // ✅ / ❌ tugmalar
    const reply_markup = {
      inline_keyboard: [
        [
          { text: "✅ Qabul qilindi", callback_data: "lead_ok" },
          { text: "❌ Rad etildi", callback_data: "lead_no" },
        ],
      ],
    };

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
        reply_markup,
      }),
    });

    const tgJson = await tgRes.json();

    if (!tgJson.ok) {
      return Response.json({ ok: false, telegram: tgJson }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
