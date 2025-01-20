'use strict'

const Shorten = require('./Model')

exports.test = async (req, res, next) => {
    try{
        return res.status(200).send({ message: 'Test API' })
    }catch(error){
        next(error)
    }
}