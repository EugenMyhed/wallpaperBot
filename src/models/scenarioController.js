'use strict'


import keyboard from './botLook/keyboard'
import Text from './botLook/messageText'

//-------------
//Scenario zone
import userGreeting_SC from './scenario/userGreeting'
import wallCreation_SC from './scenario/wallCreation'
import startAbout_SC from './scenario/startAbout'
import channelSet_SC from './scenario/channelSet'
import postCreation_SC from './scenario/postCreation'

import logger from './logger'

import { getUser, setUser, setChannel } from './db/dbController'

export default function (bot) {
    bot.start(async (ctx, next) => {
        if (await destributeScenario('start', ctx, next)) {
            //logger.debug(1)
        } else {
            startHandler(ctx, next)
        }
    })

    bot.on('callback_query', async function (ctx, next) {
        if (!await destributeScenario('callback_query', ctx, next)) {
            ctx.session.mes_1 = 'hui'
            callback_queryHandler(ctx, next)
        }
    })
    bot.on('message', async (ctx, next) => {
        await destributeScenario('message', ctx, next)
    })

    bot.on('text', async (ctx, next) => {
        if (!await destributrseScenario('text', ctx, next)) {
            if (ctx.message.text == Text.createPost_key) {
                await postCreation_SC.start(ctx)
            }
        }
    })
    bot.on('channel_post', async (ctx, next) => {
        const post = ctx.channelPost
        if (post.text.split(Text.createChannelCommandIndexOf)[1]) {
            //logger.debug(`User id: ${post.text.split(Text.createChannelCommandIndexOf)[1]}`)
            channelSet_SC.start(ctx, next)
        }
    })

}
//-------------------
//dataChannel handler
async function callback_queryHandler(ctx, next) {
    //logger.debug(`inCallbackData`)
    const query = ctx.callbackQuery
    switch (query.data) {
    case 'createWall':
        ctx.session.message = 'huy'
        wallCreation_SC.start('callback_query', ctx, next)
        break
    default:
        ctx.answerCbQuery(Text.nowCallbackData)
    }
}

function preSession(ctx) {
    if (ctx.session) {
        ctx.session.scenario = ctx.session.scenario || 'empty'
        ctx.session.options = ctx.session.options || {}
        userGreeting_SC.launchStep(ctx)
        wallCreation_SC.launchStep(ctx)
        startAbout_SC.launchStep(ctx)
        postCreation_SC.launchStep(ctx)
    }
}
async function startHandler(ctx, next) {
    logger.debug(`inStart ${ctx.session.scenario}`)
    const mes = ctx.message
    const wall = await getUser(mes.chat.id)
        .catch(err => errInRunway(ctx, err)) || {}
    setOptions(ctx, wall)
    logger.debug(`Option fullness ${getOptionFullness(wall)} !`)
    switch (getOptionFullness(wall)) {
    case 0:
        await userGreeting_SC.start('start', ctx, next)
        break
    case 1:
        await wallCreation_SC.start('start', ctx, next)
        break
    case 2:
        await ctx.reply('Канал', keyboard.chooseChannel(wall.user_id))
        break
    case 3:
        // await wallCreation_SC.makeStep('start', ctx, next, 2)
        break
    default:
        next()
        break
    }
}
//----------------
async function destributeScenario(dataChannel, ctx, next) {
    return new Promise(async (res, rej) => {
        preSession(ctx)
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
//helping functions

//this function handle all scenario

function errInRunway(ctx, err) {
    ctx.reply(Text.err)
    //log about user and err type
}

function getOptionFullness(options) {
    // logger.debug(options)
    if (options.chat_id && options.user_id && options.username && options.channel_id) return 3
    else if (options.chat_id && options.user_id && options.username) return 2
    else if (options.chat_id && options.user_id) return 1
    else return 0
}

function setOptions(ctx, wall) {
    //wall.id = ''
    ctx.session.options = wall
}
