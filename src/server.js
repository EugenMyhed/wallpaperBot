'use strict'
import Telegraf from 'telegraf'

import LocalSession from 'telegraf-session-local'
import Stage from 'telegraf/stage'
import Scene from 'telegraf/scenes/base'

import logger from './models/logger'
import { TOKEN } from './config/config'

import scenarioController from './models/scenarioController'
// import BotMainInterface from './models/bot'
// import FeedBackMainInterface from './models/feedback'

require('babel-core/register')
require('babel-polyfill')

const PORT = process.env.PORT || 3000
const bot = new Telegraf(TOKEN) //pooling true
const stage = new Stage()

bot.use((new LocalSession({ database: 'example_db.json' }))
    .middleware())
//bot.use(stage.middleware())

bot.telegram.getMe()
    .then(botInformation => {
        bot.options.botUsername = botInformation.username
        logger.debug('Server has initialized bot. Nick: ' + botInformation.username)
    })

bot.use(async (ctx, next) => {
    //console.log(ctx.channelPost)
    const start = new Date()
    await next()
    const ms = new Date() - start
    logger.info('Response time %sms', ms)
})
scenarioController(bot)
//BotMainInterface(bot)
//FeedBackMainInterface(bot)

bot.catch(err => {
    logger.error(`Error in bot Middelware: ${err}`)
})

bot.startPolling()
