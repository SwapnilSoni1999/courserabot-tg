const fs = require('fs')
const Telegraf = require('telegraf').default;
const bot = new Telegraf('658485996:AAGydxSLzOEM9UuNEJGo8PweaBHFPLe2x4U');

async function extractChatIds() {

    const messages = JSON.parse(fs.readFileSync('messages.json')).messages
    
    let chatIds = []
    
    for (let message of messages) {
        let text = message.text
        if (Array.isArray(text)) {
            const data = []
            for (let txt of text) {
                if (typeof txt === 'object') {
                    data.push(txt.text)
                }
                else {
                    data.push(txt)
                }
                text = data.join('')
            }
        }
        // console.log(text)
        if (text.match(/User chat: ({.+})/g)) {
            const jsonData = text.match(/{.+}/g)[0]
            chatIds.push(JSON.parse(jsonData).id)
        }
    }
    
    const set = new Set(chatIds)
    chatIds = []
    for(let chatId of set.values()) {
        chatIds.push(chatId)
    }
    return chatIds
}

async function requestDonation() {
    const REQUEST_MESSAGE = "Hi, Thanks for using CourseraBot.\nAs you know this bot allows you to access many coursera courses for free, for now it's hard to manage the bot by the owner financially as the owner faced terrible time recently. Please consider donating some amount through paytm.\nGetting knowledge is power, Supporting the project will give me more inspiration to work further.\nThankyou."
    const QR_IMAGE = fs.createReadStream('paytm_qr.jpg')
    const chatIds = await extractChatIds()
    console.log('Sending messages to', chatIds.length, 'people.')
    for (let chatId of chatIds) {
        try {
            const message = await bot.telegram.sendPhoto(chatId, { source: './paytm_qr.jpg' }, { caption: REQUEST_MESSAGE })
            console.log('Sent to', chatId)
        } catch (err) {
            console.log(err)
        }
    }
    console.log('Finished!')
}

requestDonation()
