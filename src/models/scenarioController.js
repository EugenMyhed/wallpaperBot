'use strict'


import keyboard from './botLook/keyboard'
import Text from './botLook/messageText'

//-------------
//Scenario zone
import userGreeting_SC from './scenario/userGreeting'
import wallCreation_SC from './scenario/wallCreation'
import startAbout_SC from './scenario/startAbout'
import channelSet_SC from './scenario/channelSet'

import logger from './logger'

import { getUser, setUser, setChannel } from './db/dbController'

export default function (bot) {
    bot.use((ctx, next) => {
        ctx.session.scenario = ctx.session.scenario || 'empty'
        ctx.session.options = ctx.session.options || {}
        next()
    })

    bot.start(async (ctx, next) => {
        if (await destributeScenario('start', ctx, next)) {
            //logger.debug(1)
        } else {
            startHandler(ctx, next)
        }
    })

    bot.on('callback_query', async (ctx, next) => {
        if (!await destributeScenario('callback_query', ctx, next))
            callback_queryHandler(ctx, next)
    })
    bot.on('message', async (ctx, next) => {
        await destributeScenario('message', ctx, next)
    })

    bot.on('text', async (ctx, next) => {
        await destributrseScenario('text', ctx, next)
    })
    bot.on('channel_post', async (ctx, next) => {
        const post = ctx.channelPost
        if (post.text.split(Text.createChannelCommandIndexOf)[1]) {
            channelSet_SC.start(ctx, next)
        } else next()
    })

}
async function destributeScenario(dataChannel, ctx, next) {
    return new Promise(async (res, rej) => {
        logger.debug(`inDistributer ${ctx.session.scenario}`)
        switch (ctx.session.scenario) {
        case 'userGreeting':
            await userGreeting_SC.control(dataChannel, ctx, next)
            res(true)
            break
        case 'wallCreation':
            await wallCreation_SC.control(dataChannel, ctx, next)
            res(true)
            break
        case 'postCreation':
            await wallCreation_SC.control(dataChannel, ctx, next)
            res(true)
            break
        case 'userFeedback':
            await userFeedback_SC.control(dataChannel, ctx, next)
            res(true)
            break
        case 'shareRobot':
            await shareRobot_SC.control(dataChannel, ctx, next)
            res(true)
            break
        case 'wallSet':
            await wallSet_SC.control(data, ctx, next)
            res(true)
            break
        default:
            res(false)
        }
    })
}
//-------------------
//dataChannel handler
//this functions handles only emty scenario
async function callback_queryHandler(ctx, next) {
    logger.debug(`inCallbackData`)
    const query = ctx.callbackQuery
    switch (query.data) {
    case 'createWall':
        wallCreation_SC.start('callback_query', ctx, next)
        break
    default:
        next()

    }
}

async function startHandler(ctx, next) {
    logger.debug(`inStart ${ctx.session.scenario}`)
    const mes = ctx.message
    const wall = await getUser(mes.chat.id)
        .catch(err => errInRunway(ctx, err)) || {}
    setOptions(ctx, wall)
    logger.debug(`${getOptionFullness(wall)} !`)
    switch (getOptionFullness(wall)) {
    case 0:
        await userGreeting_SC.start('start', ctx, next)
        break
    case 1:
        await wallCreation_SC.start('start', ctx, next)
        break
    case 2:
        await wallCreation_SC.step('start', ctx, next, 1)
        break
    case 3:
        await wallCreation_SC.step('start', ctx, next, 2)
        break
    default:
        next()
        break
    }
}
//----------------
//helping functions

//this function handle all scenario

function errInRunway(ctx, err) {
    ctx.reply(Text.err)
    //log about user and err type
}

function getOptionFullness(options) {
    if (options.chat_id && options.user_id) return 1
    else if (options.chat_id && options.user_id && options.username) return 2
    else if (options.chat_id && options.user_id && options.username && options.channel_id) return 3
    else return 0
}

function setOptions(ctx, wall) {
    //wall.id = ''
    ctx.session.options = wall
}
