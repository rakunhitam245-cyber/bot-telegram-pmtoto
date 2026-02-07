const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const TOKEN = process.env.TOKEN || "8594734609:AAGiezZNzydu5_4tKqS8pIhT0Y_IjV8Kv5A";
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot berjalan...");


// =================================
// TOMBOL MENU
// =================================
const menuButtons = [
  ["🔐 Login", "📝 Daftar"],
  ["🎁 Promosi", "🎯 Prediksi"],
  ["📊 RTP", "💬 Livechat"],
  ["📲 Download", "👤 Hubungi"]
];


// =================================
// 🔥 SEMUA SETTING DI SINI SAJA
// =================================
const menuData = {
  "🔐 Login": {
    keywords: ["login", "masuk", "signin"],
    buttonReply: "Silakan login akun kamu 👇",
    reply: "🔐 Login di sini:\nhttps://go.unipin.vip/go/bot-tele"
  },

  "📝 Daftar": {
    keywords: ["daftar", "register"],
    buttonReply: "Silakan daftar akun baru 👇",
    reply: "📝 https://go.unipin.vip/go/bot-tele"
  },

  "🎁 Promosi": {
    keywords: ["promo", "promosi", "bonus"],
    buttonReply: "Daftar promo tersedia hari ini 🎁",
    reply: "🎁 Detail promo:\nhttps://go.unipin.vip/go/promo-pmtoto"
  },

  "🎯 Prediksi": {
    keywords: ["prediksi", "togel", "angka"],
    buttonReply: "Prediksi sudah disiapkan 🎯",
    reply: "🎯 Lihat prediksi:\nhttps://go.unipin.vip/go/prediksi-pmtoto"
  },

  "📊 RTP": {
    keywords: ["rtp", "slot", "gacor"],
    buttonReply: "RTP slot hari ini tersedia 📊",
    reply: "📊 Cek RTP:\nhttps://go.unipin.vip/go/rtp-aseli"
  },

  "💬 Livechat": {
    keywords: ["cs", "admin", "bantuan"],
    buttonReply: "Menghubungkan ke CS...",
    reply: "💬 https://go.unipin.vip/go/livechat"
  },

  "📲 Download": {
    keywords: ["apk", "download", "app"],
    buttonReply: "APK tersedia untuk diunduh 📲",
    reply: "📲 https://go.unipin.vip/go/aplikasi-pmtoto"
  },

  "👤 Hubungi": {
    keywords: ["oop", "hubungi", "wa"],
    buttonReply: "Hubungi admin di bawah 👇",
    reply: "oop adalah manusia paling ganteng di dunia"
  }
};


// =================================
// DEFAULT
// =================================
const defaultReply =
  "❌ Tidak ditemukan.\nSilakan hubungi livechat:\nhttps://go.unipin.vip/go/livechat";


// =================================
// START
// =================================
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Selamat datang! Silakan pilih menu:", {
    reply_markup: {
      keyboard: menuButtons,
      resize_keyboard: true
    }
  });
});


// =================================
// HANDLE MESSAGE
// =================================
bot.on("message", (msg) => {
  if (!msg.text || msg.text === "/start") return;

  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  // =================================
  // 1️⃣ CEK TOMBOL (exact match)
  // =================================
  if (menuData[msg.text]) {
    bot.sendMessage(chatId, menuData[msg.text].buttonReply);
    return;
  }

  // =================================
  // 2️⃣ CEK KEYWORD MANUAL
  // =================================
  for (const menu in menuData) {
    for (const word of menuData[menu].keywords) {
      if (text.includes(word)) {
        bot.sendMessage(chatId, menuData[menu].reply);
        return;
      }
    }
  }

  // =================================
  // 3️⃣ DEFAULT
  // =================================
  bot.sendMessage(chatId, defaultReply);
});
