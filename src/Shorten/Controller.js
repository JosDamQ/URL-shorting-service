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
        
        const url = await Shorten.findOne({ shortUrl })
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

        // TODO: Implementar el redireccionamiento a la URL correcta

        return res.status(200).send({ message: 'URL found', url: urlObject })
    }catch(error) {
        next(error)
    }
}

exports.updateUrl = async (req, res, next) => {
    try{
        const { shortUrl } = req.params
        const data = req.body

        if(!shortUrl) return res.status(400).send({ message: 'Short URL is required' })

        const url = await Shorten.findOne({ shortUrl }).select('-accessCount')
        if(!url) return res.status(404).send({ message: 'URL not found' })

        if(!data.url) return res.status(400).send({ message: 'New URL is required' })

        if(!validateURL(data.url)) return res.status(400).send({ message: 'Invalid URL format' })

        await url.updateOne({ url: data.url })

        return res.status(200).send({ message: 'URL updated', url })
        
    }catch(error){
        next(error)
    }
}

exports.deleteUrl = async (req, res, next) => {
    try{
        const { shortUrl } = req.params
        if(!shortUrl) return res.status(400).send({ message: 'Short URL is required' })

        const url = await Shorten.findOne({ shortUrl })
        if(!url) return res.status(404).send({ message: 'URL not found' })

        await url.deleteOne();

        return res.status(200).send({ message: 'URL deleted' })

    }catch (error){
        next(error)
    }
}

exports.getStatistics = async (req, res, next) => {
    try{
        const { shortUrl } = req.params
        if(!shortUrl) return res.status(400).send({ message: 'Short URL is required' })

        const url = await Shorten.findOne({ shortUrl })
        if(!url) return res.status(404).send({ message: 'URL not found' })

        return res.status(200).send({ message: 'URL statistics', url })
    }catch (error){
        next(error)
    }
}