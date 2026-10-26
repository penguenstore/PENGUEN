export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("PENGUEN BOT is running");
    }

    const update = await request.json();
    const message = update.message;

    if (!message) return new Response("OK");

    const chatId = message.chat.id;
    const text = message.text || "";

    let reply;

    if (text === "/start") {
      reply =
        "🐧 أهلاً بك في متجر PENGUEN\n\n" +
        "💰 الدفع بواسطة USDT TRC20\n\n" +
        "عنوان المحفظة:\n" +
        env.TRC20_ADDRESS +
        "\n\nبعد الدفع أرسل رقم العملية TXID.";
    } else if (text === "/wallet") {
      reply = "عنوان محفظة الدفع:\n" + env.TRC20_ADDRESS;
    } else {
      reply = "أرسل /start لبدء استخدام متجر PENGUEN.";
    }

    await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply
        })
      }
    );

    return new Response("OK");
  }
};
