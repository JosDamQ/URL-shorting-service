'use strict'

const Shorten = require('./Model')
const { generateCode } = require('../services/generateCode')
const { validateURL } = require('../services/validateURL')

exports.test = async (req, res, next) => {
    try{
        return res.send(await generateCode())
    }catch(error){
        next(error)
    }
}

exports.createShorten = async (req, res, next) => {
    try{
        const { url } = req.body
        if(!url) return res.status(400).send({ message: 'URL is required' })

        if(!validateURL(url)) return res.status(400).send({ message: 'Invalid URL format' })

        const code = await generateCode()
        const newUrl = new Shorten({ url, shortUrl: code })
        await newUrl.save()
        return res.status(201).send({ message: 'URL created', url: newUrl })
    }catch(error){
        next(error)
    }
}