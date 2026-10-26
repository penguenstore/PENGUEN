export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("PENGUEN BOT is running");
    }

    try {
      const update = await request.json();
      const message = update.message;

      if (!message) return new Response("OK");

      const chatId = message.chat.id;
      const text = message.text || "";

      let reply;

      if (text === "/start") {
        reply =
          "🐧 أهلاً بك في متجر PENGUEN\n\n" +
          "💰 الدفع باستخدام USDT TRC20\n\n" +
          "محفظة الاستقبال:\n" +
          env.TRC20_ADDRESS +
          "\n\nبعد التحويل أرسل رقم العملية TXID.";
      } else if (text === "/wallet") {
        reply = "عنوان المحفظة:\n" + env.TRC20_ADDRESS;
      } else {
        reply = "أرسل /start للبدء.";
      }

      const result = await fetch(
        `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: reply })
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
