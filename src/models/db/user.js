'use strict'

import mongoose from 'mongoose'

const dataSchema = mongoose.Schema({
    chat_id: Number,
    user_id: Number,
    channel_id: Number,
    username: String,
    creationDate: String,
    lastSeenDate: String
})

export default mongoose.model('users', dataSchema)