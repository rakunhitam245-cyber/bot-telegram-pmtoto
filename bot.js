const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.TOKEN || "8594734609:AAGg-WY4WExETLAPdvEYNwF7EvqD-t4Q05c";
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot berjalan...");

// =================================
// ✅ TOMBOL KEYBOARD (UI SAJA)
// =================================
const menuKeyboard = [
  ["🔐 Login"],
  ["📝 Daftar"],
  ["🎁 Promosi"],
  ["🎯 Prediksi Togel"],
  ["📊 RTP Slot"],
  ["💬 Livechat"],
  ["📲 Download APK"],
  ["👤 Hubungi Kami"]
];

// =================================
// ✅ REPLY KHUSUS TOMBOL (klik)
// =================================
const buttonReplies = {
  "🔐 Login": "🔐 Login di sini:\nhttps://go.unipin.vip/go/bot-tele",
  "📝 Daftar": "📝 Daftar akun baru:\nhttps://go.unipin.vip/go/bot-tele",
  "🎁 Promosi": "🎁 Detail promo:\nhttps://go.unipin.vip/go/promo-pmtoto",
  "🎯 Prediksi Togel": "🎯 Lihat prediksi:\nhttps://go.unipin.vip/go/prediksi-pmtoto",
  "📊 RTP Slot": "📊 Cek RTP:\nhttps://go.unipin.vip/go/rtp-aseli",
  "💬 Livechat": "💬 https://go.unipin.vip/go/livechat",
  "📲 Download APK": "📲 https://go.unipin.vip/go/aplikasi-pmtoto",
  "👤 Hubungi Kami": "@pmtotoindonesia"
};

// =================================
// ✅ REPLY KHUSUS KETIK MANUAL
// =================================
const keywordReplies = {
  login: "🔐 Login di sini:\nhttps://go.unipin.vip/go/bot-tele",
  daftar: "📝 Daftar akun baru:\nhttps://go.unipin.vip/go/bot-tele",
  promo: "🎁 Detail promo:\nhttps://go.unipin.vip/go/promo-pmtoto",
  prediksi: "🎯 Lihat prediksi:\nhttps://go.unipin.vip/go/prediksi-pmtoto",
  "prediksi togel": "🎯 Lihat prediksi:\nhttps://go.unipin.vip/go/prediksi-pmtoto",
  rtp: "📊 Cek RTP:\nhttps://go.unipin.vip/go/rtp-aseli",
  slot: "📊 Cek RTP Slot:\nhttps://go.unipin.vip/go/rtp-aseli",
  livechat: "💬 Silahkan menghubungi livechat kami: https://go.unipin.vip/go/livechat",
  cs: "💬 Livechat: https://go.unipin.vip/go/livechat",
  aplikasi: "📲 Link Download APK PMTOTO: https://go.unipin.vip/go/aplikasi-pmtoto",
  apk: "📲 Link Download APK PMTOTO: https://go.unipin.vip/go/aplikasi-pmtoto",
  kontak: "Berikut Kontak Official PMTOTO 24 Jam Online:\n\nWHATSAPP: https://wa.me/+6281260428264\nTELEGRAM: https://t.me/pmtotoindonesia\nROOM RESULT: https://go.unipin.vip/go/room-result",
  invest: "Syarat betting PMTOTO:\n- BBFS: 4-7 digit\n- Angka Tarung: 4-7 digit\n- 4D/3D/2D: Bebas Line\nMohon dipahami demi kelancaran dan kenyamanan bermain.",
  hadiah: "Berikut Hadiah Pasaran Togel PMTOTO: 4D,3D,2D sesuai pasaran besar. Info detail via livechat.",
  deposit: "💰 Kendala deposit silahkan hubungi livechat kami ya bosku: @pmtotoindonesia",
  rollingan: "Berikut bonus mingguan PMTOTO:\n- Bonus CashBack Slot Senin\n- Bonus Rollingan Casino Rabu\n- Bonus Referral Slot Jumat, dll.",
  password: "🔑 Silahkan menghubungi admin kami: @pmtotoindonesia",
  lupa: "🔑 Lupa password? Hubungi admin: @pmtotoindonesia",
  oop: "Oop adalah manusia paling tampan di dunia ini bosku 😎",
  wd: "Kendala withdraw? Hubungi livechat kami ya bosku.",
  withdraw: "Kendala withdraw? Hubungi livechat kami ya bosku.",
  bonus: "🧧 Promo dan Bonus PMTOTO: Cashback, New Member Bonus, Rollingan Mingguan, Referral, dll. Claim via livechat.",
  "hadiah totomacau 5d": "HADIAH 5D TOTO MACAU TIPE BET FULL:\n5D: x88,000\n4D: x9,000\n3D: x950\n2D: x95\nColok Bebas: x0.9 - x200\nColok Naga: x12-30\nColok Jitu: x8\nSHIO: x10\nDASAR: x1"
};

// =================================
// DEFAULT
// =================================
const defaultReply =
  "❌ Menu tidak ditemukan.\nSilakan pilih tombol atau ketik: login / daftar / promo / livechat";

// =================================
// KATA KASAR
// =================================
const kataKasar = ["anjing", "bajingan", "tolol", "kampret", "kontol"];
const replyKasar = [
  "😅 Tenang dulu ya, jangan marah-marah.",
  "🙃 Santai, kita bantu kok.",
  "😌 Mohon jangan pakai kata kasar, nanti kita nggak bisa bantu lebih cepat."
];

// =================================
// START
// =================================
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "👋 Selamat datang di bot.\nSilakan pilih menu di bawah:",
    {
      reply_markup: {
        keyboard: menuKeyboard,
        resize_keyboard: true
      }
    }
  );
});

// =================================
// HANDLE MESSAGE
// =================================
bot.on("message", (msg) => {
  if (!msg.text || msg.text === "/start") return;

  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  // 0️⃣ CEK KATA KASAR
  for (let kata of kataKasar) {
    if (text.includes(kata)) {
      bot.sendMessage(chatId, replyKasar[Math.floor(Math.random() * replyKasar.length)]);
      return;
    }
  }

  // 1️⃣ CEK KLIK TOMBOL
  if (buttonReplies[msg.text]) {
    bot.sendMessage(chatId, buttonReplies[msg.text]);
    return;
  }

  // 2️⃣ CEK KETIK MANUAL
  for (const key in keywordReplies) {
    if (text.includes(key)) {
      bot.sendMessage(chatId, keywordReplies[key]);
      return;
    }
  }

  // 3️⃣ DEFAULT
  bot.sendMessage(chatId, defaultReply);
});
