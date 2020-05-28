const Telegraf = require('telegraf').default;
const WizardScene = require('telegraf/scenes/wizard');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const config = require('./config');

const bot = new Telegraf(config.BOT_TOKEN);

// Middlewares
const stage = new Stage([courseraWizard])
bot.use(session());
bot.use(stage.middleware());

const courseraWizard = new WizardScene();

bot.command('invite', (ctx) => {
    ctx.scene.enter('coursera-invite');
});

bot.launch();