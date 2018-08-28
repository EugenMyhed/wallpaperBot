'use strict'

import logger from '../logger'

import keyboard from '../botLook/keyboard'
import Text from '../botLook/messageText'
import Scenario from '../scenarioFather'

import { setUser } from '../db/dbController'

//class construction
const wallCreation = new Scenario('wallCreation')

const lazyInterrupts = {
    'all': interuption
}
wallCreation.setSteps([{
        'reaction': reaction1,
        'dataChannel': ['callback_query'],
        'interrupts': lazyInterrupts
    },
    {
        'reaction': reaction2,
        'dataChannel': ['callback_query', 'text'],
        'interrupts': { 'all': interuption }
    }
])

//--------------------
//function declaration

async function reaction1(ctx) {
    return new Promise(async (res, rej) => {
        ctx.answerCbQuery()
        ctx.reply(Text.chooseUsername, keyboard.chooseUsername)
        res()
    })
}
async function reaction2(ctx) {
    return new Promise(async (res, rej) => {
        logger.debug('step 2')
        if (ctx.callbackQuery) ctx.answerCbQuery()
        const { chat_id, user_id, username } = getDataByCtx(ctx)
        await setUser(ctx, chat_id, user_id, username)
            .catch(err => errInRunway(ctx, err, res))
        ctx.session.options = getDataByCtx(ctx)
        await wallCreation.syncAnswer(ctx, Text.setChannelArray(username))
            .catch(err => errInRunway(ctx, err, res))
        ctx.reply('Канал', keyboard.chooseChannel(user_id))
        res()
    })
}

async function interuption(ctx) {
    return new Promise(async (res, rej) => {
        ctx.reply(Text.usernameWarning)
        res()
    })
}
//--------------

function errInRunway(ctx, err, res) {
    ctx.reply(Text.err)
    res()
    //log about user and err type
}

function getDataByCtx(ctx) {
    if (ctx.callbackQuery)
        return {
            chat_id: ctx.callbackQuery.message.chat.id,
            user_id: ctx.callbackQuery.message.from.id,
            username: ctx.callbackQuery.data
        }
    else
        return {
            chat_id: ctx.message.chat.id,
            user_id: ctx.message.from.id,
            username: ctx.message.text
        }
}