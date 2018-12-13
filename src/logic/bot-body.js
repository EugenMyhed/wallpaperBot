'use strict'

import logger from '../models/logger'
import * as messageSender from '../framework/messageSender'
import * as sessionParser from '../framework/sessionParser'
import * as dbController from '../db/dbController'
import config from '../config/config-file'
import getUserById from "../db/dbController"
import { realpathSync } from 'fs';

export default function (bot) {
    /*bot.use((ctx, next) =>{
        if(ctx.channelPost.text === "/startWork"){
            console.log(ctx.channelPost)
        }
        return next()
    })*/

    bot.command('start', async (ctx, next) => {
        const myUser = await dbController.registerNewUser(ctx.message.from.id)
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
        messageSender.sendText(ctx, 3)
        ctx.reply("Your ID: \n" + ctx.message.from.id)
    })
    bot.hears('Создать пост', async (ctx, next) => {
        messageSender.sendText(ctx, 4)
    })
    bot.hears('Назад', async (ctx, next) => {
        messageSender.sendText(ctx, 5)
       
    })
    bot.use((ctx) => {
        const startWork = /\/startWork [0-9]+/;
        if(ctx.channelPost){
            if(startWork.test(ctx.channelPost.text)){
            const userData = ctx.channelPost.text.split(" ");
            if(userData.length === 2){
                dbController.registerNewUser(parseInt(userData[1]));
                dbController.getUser(parseInt(userData[1]))
                .then(response => {
                    if(response.user_id === parseInt(userData[1])){
                        bot.telegram.sendMessage(ctx.channelPost.chat.id, "Канал создан!!!\nТеперь это твоя стена.")
                        bot.telegram.sendMessage(userData[1],"Канал создан!!!\nТеперь ты можеш создать пост.")
                    }
                })
                .catch(e => console.log(e))
                }
            }
        }
    });

    

    
    
   
    /*bot.hears('/startWork', async (ctx, next) => {
        console.log(ctx)
    })*/
    /*bot.command('/', (ctx) => {
        console.log(ctx.channelPost)
        
    });*/
    
/*
    bot.hears('Назад', async (ctx, next) => {
         //console.log(sessionParser.lastType(ctx, 's'))
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
