const db = require('./db');

const isBlacklisted = async (ctx, next) => {
    try {
        const res = await db.get(ctx.chat.id)
        if (res) {
            ctx.reply("You are banned for misusing of this bot!")
        } else {
            next()
        }
    } catch (error) {
        ctx.reply("Something went wrong contact Swapnil please!")
        console.log(error)
    }
}

module.exports = isBlacklisted;