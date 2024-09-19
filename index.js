const readline = require('readline');
const axios = require('axios');

const breachrUI = () => {
    console.clear();
    console.log(`
     ____                      _             ___            
    | __ ) _ __ ___  __ _  ___| |__  _ __   / _ \\ _ __ __ _ 
    |  _ \\| '__/ _ \\/ _\` |/ __| '_ \\| '__| | | | | '__/ _\` |
    | |_) | | |  __/ (_| | (__| | | | |    | |_| | | | (_| |
    |____/|_|  \\___|\\__,_|\\___|_| |_|_|     \\___/|_|  \\__, |
                                                      |___/ 
    `);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('error', (error) => {
    console.error('Readline error:', error);
    rl.close();
});

const breachr = async (url, message, count) => {
    for (let i = 0; i < count; i++) {
        try {
            await axios.post(url, { content: message });
        } catch (error) {
            console.error(`Error in message ${i + 1}: ${error.response?.status || error.message}`);
        }
    }
    restartApp();
};

const restartApp = () => {
    setTimeout(() => {
        breachrUI();
        startBreachr();
    }, 2000);
};

const startBreachr = () => {
    rl.question('1: Send messages via webhook\nChoose option: ', (option) => {
        if (option === '1') {
            rl.question('Webhook URL: ', (url) => {
                rl.question('Message: ', (message) => {
                    rl.question('How many messages?: ', (count) => {
                        const messageCount = parseInt(count, 10);
                        if (messageCount > 0) {
                            breachr(url, message, messageCount);
                        } else {
                            console.error('Message count must be a positive number');
                            restartApp();
                        }
                    });
                });
            });
        } else {
            console.error('Invalid option');
            restartApp();
        }
    });
};

breachrUI();
startBreachr();
