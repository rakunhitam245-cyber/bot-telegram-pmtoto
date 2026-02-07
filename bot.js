const TelegramBot = require("node-telegram-bot-api");
const TOKEN = process.env.TOKEN || "8594734609:AAGg-WY4WExETLAPdvEYNwF7EvqD-t4Q05c";
const bot = new TelegramBot(TOKEN, { polling: true });

// Tombol dengan URL agar langsung bisa klik daftar/login
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

// START
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Selamat datang di bot OLXTOTO!\nSilakan login untuk memulai.", {
    reply_markup: { inline_keyboard: inlineKeyboard }
  });
});


// =================================
// ✅ REPLY KHUSUS KETIK MANUAL / CALLBACK
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
  { keys: ["","Taroli","ganteng","tampan","hebat"], reply: "Taroli adalah manusia paling tampan dan serigala terhebat di dunia ini bosku 😎" },
  { keys: ["wd","withdraw","tarik","ambil","payout"], reply: "Kendala withdraw? Hubungi livechat kami ya bosku." },
  { keys: ["bonus","promosi","cashback","reward","hadiah"], reply: "🧧 Promo dan Bonus PMTOTO: Cashback, New Member Bonus, Rollingan Mingguan, Referral, dll. Claim via livechat." },
  { keys: ["hadiah totomacau 5d","totomacau","5d","toto","pasaran"], reply: "HADIAH 5D TOTO MACAU TIPE BET FULL:\n5D: x88,000\n4D: x9,000\n3D: x950\n2D: x95\nColok Bebas: x0.9 - x200\nColok Naga: x12-30\nColok Jitu: x8\nSHIO: x10\nDASAR: x1 untuk selengkapnya bisa tanya ke livechat bosku" },
  { keys: ["suryali","alwi","daulay","keren"], reply: "suryali adalah adalah pria ganteng yang jalannya kemot kemot😎" },
  
];


// =================================
// DEFAULT & KATA KASAR
// =================================
const defaultReply = "Untuk Kendala Tersebut.\nSilakan Menghubungi kami via livechat ya bosku";
const kataKasar = ["anjing","bajingan","tolol","kampret","kontol"];
const replyKasar = ["😅 Tenang dulu ya, jangan marah-marah.","🙃 Santai, kita bantu kok.","😌 Mohon jangan pakai kata kasar, nanti kita nggak bisa bantu lebih cepat"];

// =================================
// START
// =================================
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Selamat datang di bot.\nSilakan pilih menu di bawah:", { reply_markup: { inline_keyboard: inlineKeyboard } });
});

// =================================
// HANDLE CALLBACK (TOMBOL INLINE)
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  // cek keywordReplies
  let found = false;
  for (const item of keywordReplies) {
    if (item.keys.includes(data)) {
      bot.sendMessage(chatId, item.reply);
      found = true;
      break;
    }
  }

  if (!found) bot.sendMessage(chatId, defaultReply);
  bot.answerCallbackQuery(callbackQuery.id);
});

// =================================
// HANDLE PESAN MANUAL
bot.on("message", (msg) => {
  if (!msg.text || msg.text === "/start") return;

  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  // cek kata kasar
  for (let kata of kataKasar) {
    if (text.includes(kata)) {
      bot.sendMessage(chatId, replyKasar[Math.floor(Math.random()*replyKasar.length)]);
      return;
    }
  }

  // cek keyword manual
  for (const item of keywordReplies) {
    for (let key of item.keys) {
      if (text.includes(key)) {
        bot.sendMessage(chatId, item.reply);
        return;
      }
    }
  }

  // default
  bot.sendMessage(chatId, defaultReply);
});
