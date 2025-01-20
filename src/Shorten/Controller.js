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

exports.getUrl = async (req, res, next) => {
    try{
        const { shortUrl } = req.params
        if(!shortUrl) return res.status(400).send({ message: 'Short URL is required' })
        
        const url = await Shorten.findOne/*().select*/({ shortUrl })
        if(!url) return res.status(404).send({ message: 'URL not found' })

        const urlObject = {
            id: url._id,
            url: url.url,
            shortUrl: url.shortUrl,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
        }

        url.accessCount++
        await url.save()
        return res.status(200).send({ message: 'URL found', url: urlObject })
    }catch(error) {
        next(error)
    }
}