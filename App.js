const { startDiscordBot, messageEmitter } = require('./discordBot');
const { forwardToWhatsApp, cleanUpSession, startWhatsappClient } = require('./whatsApp');














startWhatsappClient();
startDiscordBot();
messageEmitter.on('newMessage', (message) => {
    forwardToWhatsApp(message);
})




