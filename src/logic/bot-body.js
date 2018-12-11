'use strict'

import logger from '../models/logger'
import * as messageSender from '../framework/messageSender'
import * as sessionParser from '../framework/sessionParser'
import * as dbController from '../db/dbController'
import config from '../config/config-file'

export default function (bot) {
    bot.use((ctx, next) => {
        if (ctx.channelPost) {
            console.log(ctx.channelPost)
        } else return next()
    })

    bot.command('start', async (ctx, next) => {
        // const myUser = await dbController.registerNewUser(ctx)
        messageSender.sendMessageText(ctx, 1)
    })

    bot.hears('/clear', async (ctx, next) => {
        ctx.session.state = ''
        ctx.save()
        ctx.reply('cleared')
    })
    bot.hears('Узнать больше', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 2)

    })

    bot.hears('Начать', async (ctx, next) => {
        console.log(ctx.session)
        messageSender.sendText(ctx, 3)
    })
    bot.command('startWork', (ctx) => {
        console.log(ctx)

        //console.log(ctx.channelPost)
    });
}
