'use strict'

import logger from '../logger'

import keyboard from '../botLook/keyboard'
import Text from '../botLook/messageText'
import Scenario from '../scenarioFather'

import { setUser } from '../db/dbController'

//class construction
const postCreation = new Scenario('wallCreation')

postCreation.setSteps([{
        'reaction': reaction1,
        'dataChannel': ['text'],
        'interrupts': { 'all': interuption1 }
    },
    {
        'reaction': reaction2,
        'dataChannel': ['message', 'text'],
        'interrupts': { 'all': interuption2 }
    }
])

//--------------------
//function declaration

async function reaction1(ctx) {
    return new Promise(async (res, rej) => {
        // logger.debug('step 1')
        ctx.reply(Text._createPost)
        res()
    })
}
async function reaction2(ctx) {
    return new Promise(async (res, rej) => {
        // logger.debug('step 2')

        res()
    })
}

async function interuption1(ctx) {
    return new Promise(async (res, rej) => {
        debug.error('WTF!?!??!??!')
        res()
    })
}
async function interuption1(ctx) {
    return new Promise(async (res, rej) => {
        ctx.reply(Text.createPost_forbid)
        res()
    })
}

function errInRunway(ctx, err, res) {
    ctx.reply(Text.err)
    res()
    //log about user and err type
}

export default postCreation
