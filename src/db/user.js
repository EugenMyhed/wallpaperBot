'use strict'

import mongoose from 'mongoose'

const dataSchema = mongoose.Schema({
    user_id: Number,
    creationDate: String
})

export default mongoose.model('user', dataSchema)
