const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const wallet = process.env.TRC20_ADDRESS;

bot.start((ctx) => {
  ctx.reply(
    '🐧 أهلاً بك في متجر PENGUEN\n\n' +
    '💰 للدفع باستخدام USDT TRC20\n\n' +
    'محفظة الاستقبال:\n' + wallet +
    '\n\nبعد التحويل أرسل رقم العملية (TXID).'
  );
});

bot.command('wallet', (ctx) => {
  ctx.reply('عنوان محفظة الدفع:\n' + wallet);
});

bot.launch();

console.log('PENGUEN BOT STARTED');
