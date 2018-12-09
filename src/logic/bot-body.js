'use strict'

import logger from '../models/logger'
import * as messageSender from '../framework/messageSender'
import * as sessionParser from '../framework/sessionParser'
import * as dbController from '../db/dbController'
import config from '../config/config-file'

export default function (bot) {
    bot.command('start', async (ctx, next) => {
        const myUser = await dbController.registerNewUser(ctx)
        messageSender.sendMessageText(ctx, 1)
    })
    bot.hears('/test', async (ctx, next) => {
        ctx.reply(sessionParser.depth(ctx, 's6'))
    })
    bot.hears('/clear', async (ctx, next) => {
        ctx.session.state = ''
        ctx.save()
        ctx.reply('cleared')
    })
    bot.hears('Инструкция', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 2)
    })

    bot.hears('Как сделать обмен?', async (ctx, next) => {
        messageSender.sendText(ctx, 3)
    })

    bot.hears('Экспресс обмен', async (ctx, next) => {
        messageSender.sendText(ctx, 4)
    })

    bot.hears('Автогарант', async (ctx, next) => {
        messageSender.sendText(ctx, 5)
    })

    bot.hears('Поддержка', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 6)
    })

    bot.hears('Связаться с администратором', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 7)
    })

    bot.hears('Проблемы в работе бота', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 8)
    })

    bot.hears('Пожелания/улучшения', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 9)
    })

    bot.hears('Статус заявки', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 10)
    })

    bot.hears('Отменить последнюю заявку', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 11)
    })

    bot.hears(/(Обмен уже совершен)|(Нужно изменить заявку)/, async (ctx, next) => {
        messageSender.sendMessageText(ctx, 12)
    })

    bot.hears('Другая причина', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 13)
    })

    bot.hears('Пропустить', async (ctx, next) => {
        messageSender.sendMessageText(ctx, 14)
    })
    bot.hears('Наши отзывы', async (ctx, next) => {
        messageSender.sendText(ctx, 15)
    })
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
    })
    // var ctx = {}
    // ctx.session = {}
    // ctx.session.state = ''
    // ctx.save = () => {}
    // ctx.message = { from: { id: 'id' } }
    // messageSender.sendMessageText(ctx, 1)

}
