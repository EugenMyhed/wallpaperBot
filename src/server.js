'use strict'
import Telegraf from 'telegraf'

import LocalSession from 'telegraf-session-local'
import session from 'telegraf/session'
import logger from './models/logger'
import { TOKEN } from './config/config'

import scenarioController from './models/scenarioController'

require('babel-core/register')
require('babel-polyfill')

const PORT = process.env.PORT || 3000
const bot = new Telegraf(TOKEN) //pooling true

bot.use((new LocalSession({
        database: 'example_db.json',
        storage: LocalSession.storageFileAsync
    }))
    .middleware())
// bot.use(session())

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

bot.catch(err => {
    logger.error(`Error in bot Middelware: ${err}`)
})

bot.startPolling()
