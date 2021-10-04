const Telegraf = require('telegraf').default;
const WizardScene = require('telegraf/scenes/wizard');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const { spawn } = require('child_process');

const config = require('./config');
const db = require('./db');
const isBlacklisted = require('./blacklist');
// Add myself to get notified
const swapnil = "317890515";

const bot = new Telegraf(config.BOT_TOKEN);
db.init();

// Middlewares
bot.use((ctx) => {
    return ctx.reply([
        'Hi! The bot has been shutdown. The coursera enrollment program is finished.',
        'Thanks for supporting my projects.',
        'If you wish to you can checkout my projects on my',
        'git: https://github.com/SwapnilSoni1999',
        'you can connect with me on facebook: https://fb.com/swapnilsoni1999'
    ])
})

bot.use(session());
bot.use(isBlacklisted);

// utils
async function isValidMail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

const courseraWizard = new WizardScene(
    'coursera-invite',
    async (ctx) => {
        await ctx.reply("Enter email id")
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.email = ctx.message.text;
        if(!await isValidMail(ctx.wizard.state.email)) {
            ctx.reply('Email is not valid!');
            return ctx.scene.leave();
        }
        await ctx.reply("Enter your name")
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.name = ctx.message.text;
        const { email, name } = ctx.wizard.state;

        await ctx.reply(`Your email: ${email}\nYour Name: ${name}`);
        await ctx.tg.sendMessage(swapnil, `Email: ${email}\nName: ${name}\nUser chat: ${JSON.stringify(ctx.chat)}`)
        await ctx.reply('Sending Invitation please wait...');
        try {
            const process = spawn('python', [ './coursera.py', "--email", email, "--name", name ]);
            let dataToSend = '';
            process.stdout.on('data', (chunk) => {
                dataToSend += Buffer.from(chunk).toString();
            });

            process.stdout.on('end', () => {
                const returnData = JSON.parse(dataToSend);
                console.log(returnData);
                if ('errorCode' in returnData) {
                    if (returnData.errorCode == 'Not Authorized') {
                        ctx.reply("Bot is under maintenance! Please try after an hour!");
                    }
                    ctx.replyWithMarkdown("Invitation **Already** Sent! Please check your mailbox.\n```If you face any issue then please contact Swapnil Thanks.```\nAlso Checkout https://gamerary.com if you want to :3");
                } else if ('id' in returnData) {
                    ctx.replyWithMarkdown("Invitation Sent!\n```If you face any issue then please contact Swapnil Thanks.```\nAlso Checkout https://gamerary.com if you want to :3");
                }
                // Get notified that someone enrolled
                ctx.tg.sendMessage(swapnil, returnData);
            });

        } catch (error) {
            ctx.reply("Something went wrong! Please contact Swapnil on Facebook.");
            console.log(error);
        }

        return ctx.scene.leave();
    },
);

const stage = new Stage([courseraWizard])
bot.use(stage.middleware())

bot.command('invite', (ctx) => {
    ctx.scene.enter('coursera-invite');
});

bot.command('/ban', async (ctx) => {
    if (ctx.chat.id == swapnil) {
        const chatId = ctx.message.text.split(' ')[1]
        const alreadyThere = await db.get(chatId)
        if (alreadyThere) {
            return ctx.reply('User is already banned!')
        }

        const added = await db.push(chatId)
        if (added) {
            ctx.reply('Banned ID:' + chatId)
        } else {
            ctx.reply('issues with banning')
        }
    } else {
        ctx.reply('You iz not allowed to run this command kid :3');
    }
});
bot.command('/unban', async (ctx) => {
    if (ctx.chat.id == swapnil) {
        const chatId = ctx.message.text.split(' ')[1]
        const there = await db.get(chatId)
        if (!there) {
            return ctx.reply('User is not in ban list')
        }

        const removed = await db.remove(chatId);
        if (removed) {
            ctx.reply('Unbanned:' + chatId)
        } else {
            ctx.reply('issues with unbanning')
        }
    } else {
        ctx.reply('You iz not allowed to run this command kid :3');
    }
});

bot.launch();
