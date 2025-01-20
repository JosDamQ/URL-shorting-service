'use strict'

const mongoose = require('mongoose')

const shortenSchema = new mongoose.Schema({
    url: {
        type: String,
        unique: true,
        required: [true, 'URL is required'],
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    accessCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Shorten', shortenSchema)