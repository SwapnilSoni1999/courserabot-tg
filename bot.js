const Telegraf = require('telegraf').default;
const WizardScene = require('telegraf/scenes/wizard');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const { spawn } = require('child_process');

const config = require('./config');
// Add myself to get notified
const swapnil = "317890515";

const bot = new Telegraf(config.BOT_TOKEN);

// Middlewares
const stage = new Stage([courseraWizard])
bot.use(session());
bot.use(stage.middleware());

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
                ctx.tg.sendMessage(swapnil, returnData);
            });

        } catch (error) {
            ctx.reply("Something went wrong! Please contact Swapnil on Facebook.");
            console.log(error);
        }
        
        return ctx.scene.leave();
    },
);

bot.command('invite', (ctx) => {
    ctx.scene.enter('coursera-invite');
});

bot.launch();