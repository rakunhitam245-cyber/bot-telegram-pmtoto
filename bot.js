// ========================================
// 🤖 PMTOTO TELEGRAM BOT + GEMINI AI
// FULL 1 FILE VERSION
// ========================================

const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");


// ========================================
// 🔥 ISI TOKEN DI SINI
// ========================================
const TOKEN = "8594734609:AAGg-WY4WExETLAPdvEYNwF7EvqD-t4Q05c";
const GEMINI_API_KEY = "AIzaSyAXR-RAP6bMb-2fwAcu45CyKV3f7hskn8c";
// ========================================


// ========================================
// START BOT
// ========================================
const bot = new TelegramBot(TOKEN, { polling: true });
console.log("✅ Bot aktif...");


// ========================================
// INLINE BUTTON
// ========================================
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


// ========================================
// 🧠 KEYWORD DATABASE (ISI SENDIRI)
// AI akan pakai ini sebagai KNOWLEDGE BASE
// ========================================
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


// ========================================
// DEFAULT & FILTER
// ========================================
const defaultReply = "Halo bosku 👋 Ada yang bisa dibantu?";

const kataKasar = ["anjing","bajingan","tolol","kampret","kontol"];


// ========================================
// START COMMAND
// ========================================
 bot.sendPhoto(chatId, 'https://obscura404.top/5bd98fd7/images/1767953724_6960d53c397af.webp', { caption: "👋 Selamat datang di bot PMTOTO Saya Alya Mikhailovna ada yang bisa saya bantu bosku ?." })
        .then(() => {
            // Baru kirim teks + inline keyboard
            bot.sendMessage(chatId, "Bisa Di Klik Tombol Di bawah Ini Untuk Akses Kami ya bosku:", {
                reply_markup: {
                    inline_keyboard: inlineKeyboard
                }
            });
        })
        .catch(err => console.log(err));
});
const knowledge = keywordReplies
    .map(k => `${k.keys.join(", ")} → ${k.reply}`)
    .join("\n");

  const prompt = `
Kamu adalah customer service.

Database info:
${knowledge}

Jawab santai & natural sesuai pertanyaan user.

User: ${userText}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("✅ AI BERHASIL:", text);

    return text || defaultReply;

// ========================================
// 🧠 GEMINI AI (IMPROVISASI PAKAI KEYWORD)
// ========================================
async function aiReply(userText) {
  if (!GEMINI_API_KEY) return defaultReply;

  // ubah keywordReplies jadi knowledge text
  const knowledge = keywordReplies
    .map(k => `Keyword: ${k.keys.join(", ")}\nJawaban: ${k.reply}`)
    .join("\n\n");

  const prompt = `
Kamu adalah customer service resmi.

Gunakan database berikut untuk menjawab:
${knowledge}

Aturan:
- jawab santai & ramah
- improvisasi seperti manusia
- gunakan link/jawaban dari database jika relevan
- jangan jawab di luar topik

User: ${userText}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    return res.data.candidates?.[0]?.content?.parts?.[0]?.text || defaultReply;

  } catch (err) {
    console.log("Gemini error:", err.message);
    return defaultReply;
  }
}


// ========================================
// HANDLE MESSAGE
// ========================================
bot.on("message", async (msg) => {
  if (!msg.text || msg.text === "/start") return;

  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  console.log("\nPesan masuk:", text);


  // ============================
  // kata kasar
  // ============================
  if (kataKasar.some(k => text.includes(k))) {
    return bot.sendMessage(chatId, "😅 Santai ya bosku, kita bantu kok");
  }


  // ============================
  // keyword manual (cepat & hemat quota)
  // ============================
  for (const item of keywordReplies) {
    if (item.keys.some(k => text.includes(k))) {
      console.log("⚡ Manual reply");
      return bot.sendMessage(chatId, item.reply);
    }
  }


  // ============================
  // AI fallback improvisasi
  // ============================
  const reply = await aiReply(msg.text);

  console.log("AI:", reply);

  bot.sendMessage(chatId, reply);
});
