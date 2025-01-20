'use strict'
//process.loadEnvFile()

const mongoose = require('mongoose')

exports.connect = async (req, res, next) => {
    try{
        const uri = process.env.MONGO_URI
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    }catch(error){
        console.log(error)
        next(error)
    }
}