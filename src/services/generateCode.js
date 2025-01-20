'use strict'

const Shorten = require('../Shorten/Model')

exports.generateCode = async () => {
    const code = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
    const url = await Shorten.findOne({ shortUrl: code })
    if(url){
        return await this.generateCode()
    }
    return code
}