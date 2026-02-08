const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");


// =================================
// ISI TOKEN DI SINI
// =================================
const TOKEN = "8594734609:AAGg-WY4WExETLAPdvEYNwF7EvqD-t4Q05c";
const GROQ_API_KEY = "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";
// =================================


const bot = new TelegramBot(TOKEN, { polling: true });

console.log("✅ Bot aktif + AI siap...");


// =================================
// INLINE BUTTON
// =================================
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
// KEYWORD REPLIES
// =================================
const keywordReplies = [

  // LINK / ALTERNATIF
  {
    keys: ["link pmtoto","link alternatif","link"],
    reply: `Ketik 🔥 𝐏𝐌𝐓𝐎𝐓𝐎 🔥 di GOOGLE yaa bossku

AKSES MUDAH ANTI LAG:
https://go.unipin.vip/go/pmtoto
https://prourl.site/pmtoto`
  },

  // INVEST / BATAS
  {
    keys: ["invest","batas invest","inves","batas inves"],
    reply: `Syarat betting PMTOTO:

BBFS 4-7 digit
Angka Tarung 4-7 digit
4D/3D/2D Bebas Line

Jika melanggar, betting tidak sah ya bosku`
  },

  // RTP
  {
    keys: ["rtp","info rtp","pola"],
    reply: `Update RTP & POLA setiap hari:
https://go.unipin.vip/go/rtp-aseli`
  },

  // KONTAK
  {
    keys: ["kontak","wa","whatsapp","telegram","cs","admin"],
    reply: `Kontak Official PMTOTO:

WA: https://wa.me/6281214469372
Telegram: https://t.me/pmtotoindonesia`
  },

  // MINIMAL DEPO
  {
    keys: ["minimal","minimal depo","min depo","minimal deposit"],
    reply: `Minimal Deposit 10.000
Minimal WD 50.000
Slot bet mulai 400`
  },

  // JADWAL
  {
    keys: ["jadwal togel","jam berapa","jadwal"],
    reply: `Jadwal Pasaran:
https://jadwal-togel-pmtoto.pages.dev/`
  },

  // BONUS
  {
    keys: ["bonus","rollingan","cashback","promo"],
    reply: `Bonus mingguan:
• Cashback Slot Senin
• Rollingan Rabu
• Referral Jumat`
  },

  // DISKON
  {
    keys: ["diskon","diskon togel"],
    reply: `Diskon terbesar:
4D 66%
3D 59%
2D 29%`
  },

  // HADIAH
  {
    keys: ["hadiah togel","hadiah","prize"],
    reply: `Hadiah terbesar:
4D x10.000
3D x1.000
2D x100`
  },

  // TOTO MACAU
  {
    keys: ["toto macau","macau 5d"],
    reply: `Hadiah TOTO MACAU:
5D x88.000
4D x9.000
3D x950
2D x95`
  },

  // MARKETING
  {
    keys: ["marketing"],
    reply: `Hubungi marketing:
0813-7610-5690`
  },

  // LUPA PASSWORD
  {
    keys: ["lupa password","lupa akun","reset password"],
    reply: `Silahkan hubungi livechat:
https://go.unipin.vip/go/livechat`
  },

  // GAME LIST
  {
    keys: ["game","games","permainan","slot apa saja"],
    reply: `Game tersedia:
• Slot
• Togel
• Live Casino
• Spaceman`
  },

  // AMAN
  {
    keys: ["aman","trusted","penipu","scam"],
    reply: `PMTOTO aman dan terpercaya bosku`
  }

];



// =================================
// KATA KASAR
// =================================
const kataKasar = ["anjing","tolol","kontol","bajingan"];
const replyKasar = "😅 Santai bosku, kita bantu ya...";


// =================================
// AI FUNCTION (GROQ)
// =================================
async function aiReply(text) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "Kamu adalah customer service PMTOTO, jawab santai, ramah, singkat. jangan menjelekan pmtoto"
          },
          {
            role: "user",
            content: text
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content;

  } catch (e) {
    console.log(e.response?.data || e.message);
    return "Server AI lagi sibuk bosku, coba lagi ya 🙏";
  }
}


// =================================
// START COMMAND
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

  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();


  // 1️⃣ kata kasar
  for (let k of kataKasar) {
    if (text.includes(k)) {
      return bot.sendMessage(chatId, replyKasar);
    }
  }


  // 2️⃣ keyword
  for (const item of keywordReplies) {
    for (let key of item.keys) {
      if (text.includes(key)) {
        return bot.sendMessage(chatId, item.reply);
      }
    }
  }


  // 3️⃣ AI fallback
  const reply = await aiReply(msg.text);
  bot.sendMessage(chatId, reply);
});
