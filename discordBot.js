const { Client, GatewayIntentBits } = require('discord.js');
const EventEmitter = require('events');

const dotenv = require('dotenv');
dotenv.config();


const messageEmitter = new EventEmitter();


const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('messageCreate', (message) => {
    if (message.channelId === '1269254252598001676') {
        console.log(`Message received: ${message.content}`);
        messageEmitter.emit('newMessage', message.content);
    }
});

function startDiscordBot() {
    client.login(process.env.DISCORD_TOKEN);
}

module.exports = { startDiscordBot, messageEmitter };
