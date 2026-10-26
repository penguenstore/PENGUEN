
export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("PENGUEN BOT is running");
    }

    try {
      const update = await request.json();
      const message = update.message;

      if (!message || !message.chat) {
        return new Response("OK");
      }

      const chatId = message.chat.id;
      const text = message.text || "";

      let reply;

      if (text === "/start") {
        reply =
          "🐧 أهلاً بك في متجر PENGUEN!\n\n" +
          "💰 الدفع باستخدام USDT TRC20\n\n" +
          "محفظة الاستقبال:\n" +
          (env.WALLET_ADDRESS || "المحفظة غير مضبوطة") +
          "\n\nبعد التحويل أرسل رقم العملية TXID.";
      } else if (text === "/wallet") {
        reply =
          "💰 عنوان المحفظة:\n" +
          (env.WALLET_ADDRESS || "المحفظة غير مضبوطة");
      } else {
        reply = "🐧 أرسل /start للبدء أو /wallet لعرض المحفظة.";
      }

      if (!env.TELEGRAM_TOKEN) {
        console.log("Missing TELEGRAM_TOKEN");
        return new Response("Configuration error", { status: 500 });
      }

      const result = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: reply
          })
        }
      );

      const data = await result.json();

      if (!data.ok) {
        console.log("Telegram error:", data);
      }

      return new Response("OK");

    } catch (error) {
      console.log("Worker error:", error);
      return new Response("Error", { status: 500 });
    }
  }
};
