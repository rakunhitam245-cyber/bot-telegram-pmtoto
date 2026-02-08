const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fs = require("fs");

const TOKEN = "8594734609:AAGg-WY4WExETLAPdvEYNwF7EvqD-t4Q05c";
const GROQ_API_KEY = "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";

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("✅ Bot aktif + AI siap");


// =================================
// BACA DATABASE.TXT
// =================================
function getRandomByTag(tag) {
  try {
    const lines = fs.readFileSync("database.txt", "utf8").split("\n");

    const list = lines
      .filter(v => v.toLowerCase().startsWith(tag.toLowerCase() + ":"))
      .map(v => v.slice(tag.length + 1).trim()); // <- FIX AMAN

    if (!list.length) return "";

    return list[Math.floor(Math.random() * list.length)];
  } catch {
    return "";
  }
}



// =================================
// DETEKSI OTOMATIS (ringan saja)
// =================================
function detectData(text) {
  const t = text.toLowerCase();

  if (t.includes("login") || t.includes("masuk"))
    return getRandomByTag("login");

  if (t.includes("daftar") || t.includes("register"))
    return getRandomByTag("daftar");

  if (t.includes("rtp") || t.includes("pola"))
    return getRandomByTag("rtp");

  if (t.includes("livechat") || t.includes("cs") || t.includes("admin"))
    return getRandomByTag("livechat");

  if (t.includes("promo") || t.includes("bonus"))
    return getRandomByTag("promo");

  if (t.includes("info") || t.includes("deposit"))
    return getRandomByTag("info");

  return "";
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
