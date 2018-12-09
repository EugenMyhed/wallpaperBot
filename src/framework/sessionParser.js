'use strict'

import logger from '../models/logger'
import config from '../config/config-file'
import { sleep } from './messageSender'

export async function makeStep(ctx, num) {
    ctx.session.state += `|s${num}`
    return ctx.save()
}
export function last(ctx) {
    if (!ctx.session.state) return null
    const arr = ctx.session.state.split('|')
    return arr[arr.length - 1]
}
export function lastType(ctx, type) {
    // console.log(JSON.stringify(ctx.session))
    if (!ctx.session.state) return null
    const arr = ctx.session.state.split('|')
    for (var i = arr.length - 1; i >= 0; i--)
        if (arr[i][0] === type) return arr[i]
    return null
}
export function end(ctx, i) {
    if (!ctx.session.state) return null
    const arr = ctx.session.state.split('|')
    return arr[arr.length - i]
}
export function endType(ctx, i, type) {
    if (!ctx.session.state) return null
    const arr = ctx.session.state.split('|')
    for (var i = arr.length - i; i >= 0; i--)
        if (arr[i][0] === type) return arr[i]
    return null
}
export function depth(ctx, val) {
    const arr = ctx.session.state.split('|')
    for (var i = arr.length - 1; i > -1; i--) {
        // console.log(arr[i])
        if (arr[i] === val) return i
    }
    return -1
}

//##### multy send part
export async function reversSend(ctx, mes, all) {
    return new Promise(async (resolve, rej) => {
        let i = 0
        if (!all || all.length == 0) resolve()
        else {
            const l = all.length > 4 ? 4 : all.length
            console.log(l)
            while (all.length > 0 && i < l) {
                const id = parseInt(all.shift()[0])
                console.log(id)
                await mySend(ctx, id, mes)
                i++
            }
            await sleep(1)
            await reversSend(ctx, mes, all)
            resolve()
        }
    })
}

function mySend(ctx, id, mes) {
    return new Promise(async (res, rej) => {
        try {
            await ctx.telegram.sendMessage(id, mes)
        } catch (e) {
            // logger.info(e)
            res(true)
        }
        res(true)
    })
}
