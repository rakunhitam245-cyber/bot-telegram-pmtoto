const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const TOKEN = "ISI_TOKEN_KAMU_DISINI";
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot berjalan...");

const menuButtons = [
  ["Invest", "Batas"],
  ["Help"]
];

const menuKeywords = {
  "Invest": ["invest", "investasi"],
  "Batas": ["batas", "limit"],
  "Help": ["help", "bantuan"]
};

const replies = {
  "Invest": "Ini adalah informasi investasi.",
  "Batas": "Ini adalah penjelasan batas / limit.",
  "Help": "Gunakan menu di bawah atau ketik kata kunci."
};

const defaultReply = "Maaf, saya tidak mengerti pesan tersebut.";

const usersFile = "./users.json";

function saveUser(userId) {
  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }
  if (!users.includes(userId)) {
    users.push(userId);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  }
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  saveUser(msg.from.id);

  bot.sendMessage(chatId, "Selamat datang! Silakan pilih menu:", {
    reply_markup: {
      keyboard: menuButtons,
      resize_keyboard: true
    }
  });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();
  saveUser(msg.from.id);

  if (msg.text === "/start") return;

  for (const menu in menuKeywords) {
    for (const keyword of menuKeywords[menu]) {
      if (text.includes(keyword)) {
        bot.sendMessage(chatId, replies[menu]);
        return;
      }
    }
  }

  bot.sendMessage(chatId, defaultReply);
});
