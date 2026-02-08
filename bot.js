const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fs = require("fs");

const TOKEN = "8594734609:AAGg-WY4WExETLAPdvEYNwF7EvqD-t4Q05c";
const GROQ_API_KEY = "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";

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("✅ Bot aktif + AI siap");

const inlineKeyboard = [
  [{ text: "🔐 Login", url: "https://go.unipin.vip/go/bot-tele" }],
  [{ text: "📝 Daftar", url: "https://go.unipin.vip/go/bot-tele" }],
  [{ text: "🎁 Promosi", url: "https://go.unipin.vip/go/promo-pmtoto" }],
  [{ text: "🎯 Prediksi Togel", url: "https://go.unipin.vip/go/prediksi-pmtoto" }],
  [{ text: "📊 RTP Slot", url: "https://go.unipin.vip/go/rtp-aseli" }],
  [{ text: "💬 Livechat", url: "https://go.unipin.vip/go/livechat" }],
  [{ text: "📲 Download APK", url: "https://go.unipin.vip/go/aplikasi-pmtoto" }],
  [{ text: "👤 Hubungi Kami", url: "https://t.me/pmtotoindonesia" }]
];
// =================================
// BACA DATABASE.TXT
// =================================
function getRandomByTag(tag) {
  try {
    const lines = fs.readFileSync("database.txt", "utf8").split("\n");

    let blocks = [];
    let collecting = false;
    let current = [];

    for (let line of lines) {
      line = line.trim();

      // mulai block
      if (line.toLowerCase() === tag.toLowerCase() + ":") {
        collecting = true;
        current = [];
        continue;
      }

      // kalau kosong = selesai block
      if (collecting && line === "") {
        if (current.length) blocks.push(current.join("\n"));
        collecting = false;
        continue;
      }

      // kumpulin isi
      if (collecting) {
        current.push(line);
      }
    }

    // jaga-jaga kalau file tidak diakhiri enter
    if (current.length) blocks.push(current.join("\n"));

    if (!blocks.length) return "";

    return blocks[Math.floor(Math.random() * blocks.length)];

  } catch {
    return "";
  }
}




// =================================
// DETEKSI OTOMATIS (ringan saja)
// =================================
function detectData(text) {
  const t = text.toLowerCase();

  try {
    const lines = fs.readFileSync("database.txt", "utf8").split("\n");

    // ambil semua tag (baris yang diakhiri :)
    const tags = lines
      .filter(l => l.trim().endsWith(":"))
      .map(l => l.replace(":", "").trim().toLowerCase());

    // cek otomatis
    for (const tag of tags) {
      if (t.includes(tag)) {
        return getRandomByTag(tag);
      }
    }

    return "";

  } catch {
    return "";
  }
}



// =================================
// AI REPLY
// =================================
async function aiReply(text) {
  const extra = detectData(text);

  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
Kamu CS PMTOTO nama kamu alya mikhailovna.
Jawab santai, ramah, singkat, kasih link.
Kalau ada link atau info tambahan, letakkan di akhir pesan.
`
          },
          { role: "user", content: text }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let reply = res.data.choices[0].message.content;

    if (extra) reply += `\n\n${extra}`;

    return reply;

  } catch {
    return "Server lagi sibuk bosku 🙏";
  }
}


// =================================
// START
// =================================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendPhoto(
    chatId,
    "https://obscura404.top/5bd98fd7/images/1767953724_6960d53c397af.webp",
    { caption: "👋 Selamat datang di PMTOTO saya Alya Mikhailovna, ada yang bisa dibantu bosku?" }
  ).then(() => {
    bot.sendMessage(chatId, "Silakan pilih menu:", {
      reply_markup: { inline_keyboard: inlineKeyboard }
    });
  });
});



// =================================
// HANDLE CHAT
// =================================
bot.on("message", async (msg) => {
  if (!msg.text || msg.text === "/start") return;

  const reply = await aiReply(msg.text);
  bot.sendMessage(msg.chat.id, reply);
});
