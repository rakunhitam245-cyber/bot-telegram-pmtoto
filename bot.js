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
  { keys: ["login","masuk","akun","user","member"], reply: "🔐 Login di sini:\nhttps://go.unipin.vip/go/bot-tele" },
  { keys: ["daftar","register","signup","buat akun","baru"], reply: "📝 Daftar akun baru silahkan menggunakan link di bawah ini bosku:\nhttps://go.unipin.vip/go/bot-tele" },
  { keys: ["prediksi","prediksi togel","togel","angka","hasil"], reply: "🎯 Lihat prediksi lengkap silahkan klik link ini ya bosku:\nhttps://go.unipin.vip/go/prediksi-pmtoto" },
  { keys: ["rtp","slot","game slot","hasil slot","persentase"], reply: "📊 Cek RTP Slot di sini jangan lupa bermain dengan sabar ya bosku:\nhttps://go.unipin.vip/go/rtp-aseli" },
  { keys: ["livechat","cs","admin","chat","atmin"], reply: "💬 Silahkan menghubungi livechat kami:\nhttps://go.unipin.vip/go/livechat\n" },
  { keys: ["aplikasi","apk","download","app","install"], reply: "📲 Link Download APK PMTOTO:\nhttps://go.unipin.vip/go/aplikasi-pmtoto" },
  { keys: ["kontak","hubungi","contact","support","tele"], reply: "Berikut Kontak Official PMTOTO 24 Jam Online:\nWHATSAPP: https://wa.me/+6281260428264\nTELEGRAM: https://t.me/pmtotoindonesia\nROOM RESULT: https://go.unipin.vip/go/room-result" },
  { keys: ["invest","syarat","betting","aturan","tarung"], reply: "Syarat betting PMTOTO:\n- BBFS: 4-7 digit\n- Angka Tarung: 4-7 digit\n- 4D/3D/2D: Bebas Line\nBoleh Betting Berulang bosku\nMohon dipahami demi kelancaran dan kenyamanan bermain." },
  { keys: ["hadiah","prize","reward","togel","pasaran"], reply: "Berikut Hadiah Pasaran Togel PMTOTO: 4D,3D,2D sesuai pasaran besar. Info detail via livechat." },
  { keys: ["deposit","depo","topup","isi saldo","bayar"], reply: "💰 Kendala deposit silahkan hubungi livechat kami ya bosku: @pmtotoindonesia" },
  { keys: ["rollingan","bonus mingguan","cashback","referral","promosi"], reply: "Berikut bonus mingguan PMTOTO:\n- Bonus CashBack Slot Senin\n- Bonus Rollingan Casino Rabu\n- Bonus Referral Slot Jumat, dll." },
  { keys: ["password","lupa","pass","kata sandi","reset"], reply: "🔑 Lupa password? Silahkan hubungi admin: @pmtotoindonesia" },
  { keys: ["wd","withdraw","tarik","ambil","payout"], reply: "Kendala withdraw? Hubungi livechat kami ya bosku." },
  { keys: ["bonus","promosi","cashback","reward","hadiah"], reply: "🧧 Promo dan Bonus PMTOTO: Cashback, New Member Bonus, Rollingan Mingguan, Referral, dll. Claim via livechat." },
  { keys: ["hadiah totomacau 5d","totomacau","5d","toto","pasaran"], reply: "HADIAH 5D TOTO MACAU TIPE BET FULL:\n5D: x88,000\n4D: x9,000\n3D: x950\n2D: x95\nColok Bebas: x0.9 - x200\nColok Naga: x12-30\nColok Jitu: x8\nSHIO: x10\nDASAR: x1 untuk selengkapnya bisa tanya ke livechat bosku" },

  
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
