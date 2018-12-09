'use strict'

import mongoose from 'mongoose'

const dataSchema = mongoose.Schema({
    user_id: Number,
    creationDate: String,
    refCount: Number,
})

export default mongoose.model('vizitkausers', dataSchema)
