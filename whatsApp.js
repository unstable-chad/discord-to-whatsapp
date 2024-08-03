const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');


// Initialize the WhatsApp client
const whatsappClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
    }
});

// Generate and scan QR code for WhatsApp Web
whatsappClient.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Please scan the QR code above with your WhatsApp app.');
});

whatsappClient.on('error', (error) => {
    console.error('Error initializing WhatsApp client:', error);
});

// When the WhatsApp client is ready
whatsappClient.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// Function to forward messages to WhatsApp
function forwardToWhatsApp(message) {
    const chatId = '923354882488-1608623137@g.us';
    // Replace with the recipient's WhatsApp number
    if (whatsappClient.info && whatsappClient.info.wid) {
        whatsappClient.sendMessage(chatId, message)
            .then(response => {
                console.log(`Message sent to WhatsApp: ${response}`);
            })
            .catch(error => {
                console.error(`Failed to send message: ${error.message}`);
            });
    } else {
        console.error("WhatsApp client is not ready.");
    }

}

function startWhatsappClient() {
    whatsappClient.initialize().catch(error => {
        console.error('Failed to initialize WhatsApp client:', error);
    });
}


function cleanUpSession() {
    const sessionDir = path.join(__dirname, '.wwebjs_auth', 'session', 'Default');
    fs.readdir(sessionDir, (err, files) => {
        if (err) {
            console.error('Failed to read session directory:', err.message);
            return;
        }
        for (const file of files) {
            if (file === 'chrome_debug.log') {
                const filePath = path.join(sessionDir, file);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Failed to delete file:', err.message);
                    } else {
                        console.log(`Deleted file: ${filePath}`);
                    }
                });
            }
        }
    });
}


module.exports = { startWhatsappClient, cleanUpSession, forwardToWhatsApp };
