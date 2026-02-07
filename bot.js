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
  login: " Login di sini:\nhttps://go.unipin.vip/go/bot-tele",
  daftar: " https://go.unipin.vip/go/bot-tele",
  promo: " https://go.unipin.vip/go/promo-pmtoto",
  prediksi: " https://go.unipin.vip/go/prediksi-pmtoto",
 
  rtp: " https://go.unipin.vip/go/rtp-aseli",
  slot: " https://go.unipin.vip/go/rtp-aseli",
  livechat: " silahkan menghubungi livechat kami bosku https://go.unipin.vip/go/livechat",
  cs: " https://go.unipin.vip/go/livechat",
  aplikasi: "Link Download Apk PMTOTO : https://go.unipin.vip/go/aplikasi-pmtoto ",
  apk: " https://go.unipin.vip/go/aplikasi-pmtoto",
  kontak: "Berikut Kontak 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐏𝐌𝐓𝐎𝐓𝐎 𝟐𝟒 𝐉𝐀𝐌 𝐎𝐍𝐋𝐈𝐍𝐄 :

𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐏𝐌𝐓𝐎𝐓𝐎 1 https://wa.me/+6281260428264

𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐏𝐌𝐓𝐎𝐓𝐎 : https://t.me/pmtotoindonesia

Jangan Lupa Kunjungi ROOM RESULT Kami Yah Bossku
ROOM RESULT 𝐏𝐌𝐓𝐎𝐓𝐎  : https://go.unipin.vip/go/room-result

Silahkan Bossku Bisa Klik / Copy Link Tautan 𝐏𝐌𝐓𝐎𝐓𝐎 
Dan Buka Di 𝐆𝐎𝐎𝐆𝐋𝐄 Maka Akan Langsung Terhubung.. ",
  kontak: "@pmtotoindonesia"
invest : "Kami informasikan kepada member setia PMTOTO berikut syarat betting di PMTOTO

BBFS (BB Campuran)
- MINIMAL 4 DIGIT
- MAXIMAL 7 DIGIT

ANGKA TARUNG (POLA TARUNG)
- MINIMAL 4 DIGIT
- MAXIMAL 7 DIGIT


4D: BEBAS LINE
3D: BEBAS LINE
2D: BEBAS LINE



Mohon Di Pahami Dengan Seksama Demi Kelancaran Dan Kenyamanan Bermain.
Jika Terdapat Pelanggaran ,. Maka Akan Kami Tindak Tegas (SELURUH BETTINGAN TIDAK DIANGGAP SAH & SALDO BETTINGAN DIHANGUSKAN)
Demikian Kami Sampaiakan Kepada Seluruh Member Setia PMTOTO,.
Salam Hoki PMTOTO ",
 hadiah: " Berikut Hadiah Pasaran Togel 𝐏𝐌𝐓𝐎𝐓𝐎
💥 HADIAH BET FULL TERBESAR 𝐏𝐌𝐓𝐎𝐓𝐎 KHUSUS 6 PASARAN BESAR :
• 4D = X10.000
• 3D = X1.000K
• 2D = X100K
PASARAN : HONGKONG, SINGAPORE, SYDNEY, CAMBODIA, TAIWAN, CHINA.

💥 HADIAH BET FULL 𝐏𝐌𝐓𝐎𝐓𝐎 Selain 6 Pasaran Besar :
Khusus Untuk Semua Pasaran KECUALI : TOTO MACAU
PRIZE 1
• 4D : 9800x
• 3D : 980x
• 2D : 98x

PRIZE 2
• 4D : 2.000x
• 3D : 200x
• 2D : 20x

PRIZE 3
• 4D : 1.000x
• 3D : 100x
• 2D : 10x

💥 HADIAH BB ( BOLAK BALIK ) 𝐏𝐌𝐓𝐎𝐓𝐎 :
• 4D ( TEPAT ) = x4.000 | 4D ( BB ) = x200
• 3D ( TEPAT )= x400 | 3D ( BB ) = x100
• 2D ( TEPAT )= x70 | 2d ( BB ) = x20

💥 HADIAH DISKON 𝐏𝐌𝐓𝐎𝐓𝐎 :
• 4D = x3.000
• 3D = x400
• 2D = x70
(2D Depan = x70 | 2D Tengah = x70 )
• 50-50 = x1
( Kenak Kei = -1.5% )
• COLOK BEBAS = x1.5
(Colok Bebas (2D)= x6 | Colok Bebas (3D) = x12 | Colok Bebas (4D)= x18)
• KOMBINASI = x2.7
• COLOK JITU = x7.5
• COLOK NAGA
(Colok Naga (3D) = x25 | Colok Naga (4D) = x37 | Macau Shio = x110)
• TEPI TENGAH = x1
( Kenak Kei = -2.5% )
• SHIO = x9
• SILANG HOMO = x1
( Kenak Kei = -2.2% )
• KEMBANG KEMPIS = x1
( Kembang - Kempis kenak kei = -2.5% | Kembar Depan-Belakang-Tengah Dapat Kei = 5% )
• DASAR = x1
( Ganjil Kenak Kei = -25% Besar Kenak Kei = -25% | Genap Dapat Kei = 5% Kecil Dapat Kei = 5% )

Hadiah - hadiah di atas berlaku untuk semua pasaran togel kecuali ( Totomacaupools ) . ",

deposit: "silahkan menghubungi admin kami ya bosku, @pmtotoindonesia",


rollingan : “berikut bonus mingguan yang di bagikan oleh pihak 𝐏𝐌𝐓𝐎𝐓𝐎 ya bosku.

- Bonus CashBack Slot di bagikan setiap hari Senin
- Bonus Saldo Gratis Slot ( Hanya Berlaku Untuk Pemain Slot Dalam 1 Minggu Tidak Bermain Permainan Lainnya, Jika Ada Bermain Selain Dari Slot Maka Tidak Bisa Claim)
- Bonus Rollingan Casino di bagikan setiap hari Rabu
- Bonus Refferal Casino di bagikan setiap hari Kamis
- Bonus Refferal Slot di bagikan setiap hari Jumat
- Bonus Cashback Live Game ( Pragmatic Play ) di bagikan setiap hari Sabtu
- Bonus Rollingan Slot di bagikan setiap hari Minggu
- Bonus Referral Togel di bagikan setiap hari . ",


password: "silahkan menghubungi admin kami ya bosku, @pmtotoindonesia",
lupa: "silahkan menghubungi admin kami ya bosku, @pmtotoindonesia",
oop: "oop adalah manusia paling tampan di dunia ini bosku",
wd: "kendala withdraw silahkan menghubungi livechat kami ya bosku dengan menekan tombol livechat",
withdraw: "kendala withdraw silahkan menghubungi livechat kami ya bosku dengan menekan tombol livechat",
depo: "kendala deposit silahkan menghubungi livechat kami ya bosku dengan menekan tombol livechat",
deposit: "kendala deposit silahkan menghubungi livechat kami ya bosku dengan menekan tombol livechat",
bonus: "🧧 Promo dan Bonus 𝐏𝐌𝐓𝐎𝐓𝐎 🧧
🔥 Bonus Saldo Gratis Bersama 𝐏𝐌𝐓𝐎𝐓𝐎
🔥 Bonus New Member 20% 𝐏𝐌𝐓𝐎𝐓𝐎
🔥 Bonus Next Harian 5% 𝐏𝐌𝐓𝐎𝐓𝐎
🔥 Bonus CashBack Mingguan 5% Slot
🔥 Bonus Rollingan Mingguan 0.5% Slot
🔥 Bonus Rollingan Mingguan 2% Casino
🔥 Bonus Refferal 0,05% Casino
🔥 Bonus Refferal 0,1% Slot
🔥 Bonus Refferal 0,1% Togel 
anda bisa claim melalui livechat ya bosku",

};

Berikut Perkalian HADIAH TOTO MACAU 5D :

hadiah totomacau 5D : “HADIAH 5D TOTO MACAU TIPE BET FULL :
5D : X 88,000
4D : x 9,000
3D : x 950
2D : x 95

Colok Bebas : x0.9
Colok Bebas ( 2D )(2 nomor ): x4
Colok Bebas ( 2D )(3 nomor ): x6
Colok Bebas ( 2D )(4 nomor ): x20
Colok Bebas ( 2D )(5 nomor ): x200
Colok Bebas ( 4D )(4 nomor ): x50
Colok Bebas ( 4D )(5 nomor ): x200
(Colok Naga (3D) = x12 | Colok Naga (4D) = x30
2 Kombinasi : x2.7
Colok Jitu : x8
TEPI TENGAH = x1
( Kena Kei = -2.2% )
SHIO = x10
DASAR =x1
( Ganjil Kenak Kei = -25% Besar Kenak Kei = -25% | Genap Dapat Kei = 10% Kecil Dapat Kei = 10% )
HADIAH 5D TOTO MACAU TIPE BET DISKON :
5D : X 50.000
4D : X 7.000
3D : X 750
2D : X 75

HADIAH TIPE BET BOLAK BALIK (BB) :
5D ( TEPAT ) : X 50,000
5D ( BB ) : X 350
4D ( TEPAT ) : x5.000
4D ( BB) : x180
3D ( TEPAT ) : x 500
3D ( BB) : x 75
2D (TEPAT) : x80
2D (BB) : x15 
};



// =================================
// DEFAULT
// =================================
const defaultReply =
  "❌ Menu tidak ditemukan.\nSilakan pilih tombol atau ketik: login / daftar / promo / livechat";

  const kataKasar = ["anjing", "bajingan", "tolol", "kampret", "kontol"]; // bisa tambah lagi
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


  // =========================
  // 1️⃣ CEK KLIK TOMBOL
  // =========================
  if (buttonReplies[msg.text]) {
    bot.sendMessage(chatId, buttonReplies[msg.text]);
    return;
  }


  // =========================
  // 2️⃣ CEK KETIK MANUAL
  // =========================
  for (const key in keywordReplies) {
    if (text.includes(key)) {
      bot.sendMessage(chatId, keywordReplies[key]);
      return;
    }
  }


  // =========================
  // 3️⃣ DEFAULT
  // =========================
  bot.sendMessage(chatId, defaultReply);
});
