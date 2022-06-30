const { Telegraf } = require('telegraf')
// const fs = require('fs')
const bot = new Telegraf('5542715343:AAEvqiDzncsq7i4mSq_zXBCLwtouNYHbQIk')


bot.start((ctx) =>{
    ctx.reply('Welcome..')
})

bot.command(['alertaError', 'alertaerror'],(ctx) =>{
    console.log('ctx: ', ctx)
    console.log('ctx.from: ', ctx.from)
    console.log(`Bienvenido ${ctx.from.first_name} ${ctx.from.last_name}`)
    bot.telegram.sendMessage(ctx.chat.id,'elelele')
    ctx.reply('No se registro correctamente la marcación')
})

bot.hears('computer', (ctx) => {
    ctx.reply('xxxxx..')
})



// bot.on('text', ctx => {
//     ctx.reply('👀')
// })

// bot.on('sticker', ctx => {
//     ctx.reply('👀')
// })

bot.launch()