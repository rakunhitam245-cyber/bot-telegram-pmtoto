const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const TOKEN = process.env.TOKEN || "ISI_TOKEN_KAMU";
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot berjalan...");


// =============================
// MENU KEYBOARD (TOMBOL)
// tinggal tambah baris kalau mau
// =============================
const menuButtons = [
  ["🔐 Login", "📝 Daftar"],
  ["🎁 Promosi", "🎯 Prediksi"],
  ["📊 RTP", "💬 Livechat"],
  ["📲 Download", "👤 Hubungi"]
];


// =============================
// SEMUA JAWABAN DI SINI
// 🔥 edit bagian ini saja
// =============================
const menuData = {
  login: {
    keywords: ["login", "masuk", "signin"],
    reply: "🔐 Login di sini:\nhttps://go.unipin.vip/go/bot-tele"
  },

  daftar: {
    keywords: ["daftar", "register", "buat akun"],
    reply: "📝 Daftar akun baru:\nhttps://go.unipin.vip/go/bot-tele"
  },

  promosi: {
    keywords: ["promo", "promosi", "bonus"],
    reply: "🎁 Promo terbaru:\nhttps://go.unipin.vip/go/promo-pmtoto"
  },

  prediksi: {
    keywords: ["prediksi", "togel", "angka"],
    reply: "🎯 Prediksi hari ini:\nhttps://go.unipin.vip/go/prediksi-pmtoto"
  },

  rtp: {
    keywords: ["rtp", "slot", "gacor"],
    reply: "📊 RTP Slot hari ini:\nhttps://go.unipin.vip/go/rtp-aseli"
  },

  livechat: {
    keywords: ["cs", "admin", "livechat", "bantuan"],
    reply: "💬 Hubungi CS:\nhttps://go.unipin.vip/go/livechat"
  },

  download: {
    keywords: ["apk", "download", "app"],
    reply: "📲 Download APK resmi:\nhttps://go.unipin.vip/go/aplikasi-pmtoto"
  },

  hubungi: {
    keywords: ["kontak", "hubungi", "wa"],
    reply: "👤 Admin Telegram:\n@pmtotoindonesia"
  }
};


// =============================
// DEFAULT JAWABAN (kalau ga ketemu)
// =============================
const defaultReply =
  "❌ Pertanyaan tidak ditemukan.\nSilakan hubungi livechat:\nhttps://go.unipin.vip/go/livechat";


// =============================
// SIMPAN USER
// =============================
const usersFile = "./users.json";

function saveUser(id) {
  let users = [];

  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  if (!users.includes(id)) {
    users.push(id);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  }
}


// =============================
// START → tampilkan tombol
// =============================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  saveUser(msg.from.id);

  bot.sendMessage(chatId, "👋 Selamat datang!\nSilakan pilih menu:", {
    reply_markup: {
      keyboard: menuButtons,
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});


// =============================
// HANDLE SEMUA PESAN
// =============================
bot.on("message", (msg) => {
  if (!msg.text) return;
  if (msg.text === "/start") return;

  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase().replace(/\s/g, ""); // hilangin spasi
  saveUser(msg.from.id);

  // cek semua keyword
  for (const key in menuData) {
    const { keywords, reply } = menuData[key];

    for (const word of keywords) {
      if (text.includes(word)) {
        bot.sendMessage(chatId, reply);
        return;
      }
    }
  }

  // kalau tidak ketemu
  bot.sendMessage(chatId, defaultReply);
});
