'use strict'

import mongoose from 'mongoose'
import config from '../config/config-file'
import * as messageSender from '../framework/messageSender'
import logger from '../models/logger'

import User from './user'


mongoose.connect(config.databaseURL, {
        useNewUrlParser: true
    })
    .catch(e => {
        logger.error('Mongo Error->' + e)
    })

const db = mongoose.connection

export async function setUser(data) {
    return User.collection.insertOne(data)
}
export async function getUser(user_id) {
    return User.findOne({ 'user_id': user_id })
}
export async function getUserById(id) {
    return User.findOne({ '_id': id })
}
export async function getAll() {
    return User.find({})
}
export async function registerNewUser(ctx) {
    try {
        const userTry = await getUser(ctx.message.from.id)
        if (userTry) return userTry
        else {
            const data = {
                user_id: ctx.message.from.id,
                creationDate: (new Date())
                    .getTime(),
                refCount: 0
            }
            await setUser(data)
            const spliStart = ctx.message.text.split(' ')
            if (spliStart.length == 2)
                await addRefUser(ctx, spliStart[1])
            return await getUser(data.user_id)
        }
    } catch (e) {
        logger.error('Register new user error' + e)
    }

}
export async function addRefUser(ctx, id) {
    const user = await getUser(id)
    user.refCount = user.refCount + 1
    await user.save()
    //Время наград
    // if (user.refCount % 15 == 0) { //Правила отбора
    //     // await ctx.telegram.sendMessage(config.masterChatId[0], await mesText('block1/bonusM', user))
    //     await ctx.telegram.sendMessage(user.chat_id, await mesText('block1/bonusM'), key.key23_1)
    // }
}
