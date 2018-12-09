'use strict'

import logger from '../models/logger'
import * as messageSender from '../framework/messageSender'
import * as sessionParser from '../framework/sessionParser'
import * as dbController from '../db/dbController'
import config from '../config/config-file'

export default function (bot, session) { //botLogic
    // bot.hears('Рассылка', async (ctx, next) => {
    //     if (sP.last(ctx) != 's1') return next()
    //     if (!configFile.master_id.includes(ctx.message.from.id)) return next()
    //     ctx.session.state += '|r1'
    //     await ctx.save()
    //     ctx.reply('Выберите целевую аудиторию', key.r1)
    // })
    // bot.hears('Отмена', async (ctx, next) => {
    //     if (sP.last(ctx)[0] != 'r') return next()
    //     if (!configFile.master_id.includes(ctx.message.from.id)) return next()
    //     simpleSend(ctx, 1)
    // })
    // bot.hears('Статистика админа', async (ctx, next) => {
    //     if (!config.master_id.includes(ctx.message.from.id)) return next()
    //     const all = await dbController.getAll()
    //     const ref = all.reduce((accumulator, currentUser) => accumulator + currentUser.refCount, 0)
    //     const redis = await session.getAll()
    //     //const ras = redis.reduce((accumulator, currentSession) => accumulator + currentSession[1].state.includes("s25") ? 1 : 0, 0)
    //     messageSender.sendMessageText(100, [all, ref])
    //     // ctx.reply(await mesText(`block1/allS`, all.length, ref, ras), key.key1a)
    // })
    // bot.hears('Послать всем', async (ctx, next) => {
    //     if (sP.last(ctx) != 'r1') return next()
    //     else if (!configFile.master_id.includes(ctx.message.from.id)) return next()
    //     else {
    //         ctx.session.state += '|r2'
    //         await ctx.save()
    //         ctx.reply('Напишите текст для рассылки ', key.r2)
    //     }
    // })
    // bot.hears('Заявка', async (ctx, next) => {
    //     if (sP.last(ctx) != 'r1') return next()
    //     else if (!configFile.master_id.includes(ctx.message.from.id)) return next()
    //     else {
    //         ctx.session.state += '|r3'
    //         await ctx.save()
    //         ctx.reply('Напишите текст для рассылки ', key.r2)
    //     }
    // })
    // bot.hears('Рассылка', async (ctx, next) => {
    //     if (sP.last(ctx) != 'r1') return next()
    //     else if (!configFile.master_id.includes(ctx.message.from.id)) return next()
    //     else {
    //         ctx.session.state += '|r4'
    //         await ctx.save()
    //         ctx.reply('Напишите текст для рассылки ', key.r2)
    //     }
    // })
    // bot.on('message', async (ctx, next) => {
    //     if (sP.last(ctx) != 'r2' && sP.last(ctx) != 'r3' && sP.last(ctx) != 'r4') return next()
    //     if (!configFile.master_id.includes(ctx.message.from.id)) return next()
    //     else if (ctx.message.text) {
    //         await ctx.reply('Рассылка начата')
    //         let all = await session.getAllRedis()
    //         if (sP.last(ctx) == 'r2')
    //             all = all.filter(i => { return (i[1].state.indexOf("s1") != -1) })
    //         else if (sP.last(ctx) == 'r3')
    //             all = all.filter(i => { return (i[1].state.indexOf("s37") != -1) || (i[1].state.indexOf("s29") != -1) || (i[1].state.indexOf("s33") != -1) })
    //         else if (sP.last(ctx) == 'r4')
    //             all = all.filter(i => { return (i[1].state.indexOf("s25") != -1) })
    //         const l = all.length
    //         await sP.reversSend(ctx, ctx.message.text, all)
    //         ctx.session.state += '|s1'
    //         await ctx.save()
    //         await ctx.reply(`Рассылка завершена, найдено ${l}`, key.key1a)
    //     }
    // })
}
