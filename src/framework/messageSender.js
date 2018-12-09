'use strict'

import fs from 'fs'

import logger from '../models/logger'
import config from '../config/config-file'
import key from '../messages/key'
import * as sessionParser from './sessionParser'



export async function sendText(ctx, num, params) {
    return ctx.replyWithHTML(await getTextFromFile(num, params), key.getKeyValue(ctx, num))
}
export async function sendPhoto(ctx, photo) {
    if (typeof photo === 'object') {
        photo = photo.map(i => {
            return { type: 'photo', media: i }
        })
        return ctx.replyWithMediaGroup(photo, key.getKeyValue(ctx, num))
    } else return ctx.replyWithPhoto(photo, key.getKeyValue(ctx, num))
}
let filePath = []
export function getTextFromFile(num, params, subDir) {
    // console.log(typeof params)
    if (typeof params != 'object') {
        subDir = params
        params = null
    }
    if (!subDir)
        subDir = 'mainLogic'
    if (!num) return
    let dir = __dirname
    dir = dir.replace('framework', 'messages')
    let content = ''
    if (!contents[num]) {
        // console.log(num)
        content = fs.readFileSync(`${dir}/${subDir}/${num}.txt`, { 'encoding': 'utf8' })
        // console.log(content)
        contents[num] = content
    } else
        content = contents[num]
    if (params) {
        params.forEach(i => {
            content = content.replace(/%param%/, i)
        })
    }
    return content
}

export async function sendMessageText(ctx, num, params, subDir) {
    await sessionParser.makeStep(ctx, num)
    return sendText(ctx, num, params, subDir)
}

export async function sendMessagePhoto(ctx, num, subDir) {
    await sessionParser.makeStep(ctx, num)
    return sendText(ctx, num, subDir)
}

export async function sendMessageToAdmin(ctx, role) {
    return bot.telegram.forwardMessage(configFile.adminObject[role], ctx.message.chat.id, ctx.message.message_id);
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000))
}

let contents = {}
