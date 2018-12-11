'use strict'

import logger from '../models/logger'
import * as messageSender from '../framework/messageSender'
import * as sessionParser from '../framework/sessionParser'
import * as dbController from '../db/dbController'
import config from '../config/config-file'

export default function (bot) {
    /*bot.use((ctx, next) =>{
        if(ctx.channelPost.text === "/startWork"){
            console.log(ctx.channelPost)
        }
        return next()
    })*/

    bot.command('start', async (ctx, next) => {
        const myUser = await dbController.registerNewUser(ctx)
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

    /*bot.hears('/startWork', async (ctx, next) => {
        console.log(ctx)
    })*/
    /*bot.command('/', (ctx) => {
        console.log(ctx.channelPost)
        
    });*/
    
/*
    bot.hears('Назад', async (ctx, next) => {
        // console.log(sessionParser.lastType(ctx, 's'))
        if (['s7', 's9', 's8'].includes(sessionParser.lastType(ctx, 's'))) {
            messageSender.sendMessageText(ctx, 6)
            return
        }
        if (['s10', 's2'].includes(sessionParser.lastType(ctx, 's'))) {
            messageSender.sendMessageText(ctx, 1)
            return
        }
        if (sessionParser.lastType(ctx, 's') == 's6') {
            console.log(sessionParser.depth(ctx, 's10'))
            console.log(sessionParser.depth(ctx, 's2'))
            if (sessionParser.depth(ctx, 's10') > sessionParser.depth(ctx, 's2'))
                messageSender.sendMessageText(ctx, 10)
            else
                messageSender.sendMessageText(ctx, 2)
            return
        }
        return next()
    })
    bot.hears('*', async (ctx, next) => {
        if (sessionParser.lastType(ctx, 's') == 's13') {
            await sendMessageToAdmin(ctx, 'main')
            messageSender.sendMessageText(ctx, 14)
            return
        }
        if (sessionParser.lastType(ctx, 's') == 's8') {
            await sendMessageToAdmin(ctx, 'main')
            messageSender.sendMessageText(ctx, 's16')
            return
        }
        if (sessionParser.lastType(ctx, 's') == 's9') {
            await sendMessageToAdmin(ctx, 'main')
            messageSender.sendMessageText(ctx, 17)
            return
        }
        if (sessionParser.lastType(ctx, 's') == 's7') {
            await sendMessageToAdmin(ctx, 'main')
            messageSender.sendMessageText(ctx, 18)
            return
        }
        return next()
    })*/
}
