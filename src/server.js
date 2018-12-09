'use strict'

import 'babel-polyfill';
require('babel-core/register')

import Telegraf from 'telegraf'

import logger from './models/logger'
import config from './config/config-file'

import botBody from './logic/bot-body'
import info from './logic/info'
import support from './logic/support'
import multySend from './logic/multySend'

import sessionRedis from './framework/sessionRedis'

const bot = new Telegraf(config.token, { channelMode: false })


const session = new sessionRedis({
    store: {
        host: config.REDIS.TELEGRAM_SESSION_HOST,
        port: config.REDIS.TELEGRAM_SESSION_PORT
    }
})

bot.use(session.middlewareCustom())

bot.telegram.getMe()
    .then(botInformation => {
        bot.options.botUsername = botInformation.username
        logger.debug('Server has initialized bot. Nick: ' + botInformation.username)
    })

botBody(bot, session)
info(bot, session)
support(bot, session)
multySend(bot, session)

bot.catch(err => {
    logger.error(`Error in bot Middleware: ${err}`)
})

bot.startPolling()
