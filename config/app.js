'use strict'

//process.loadEnvFile()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const port = process.env.PORT || 3100

// configuracion del server
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Iimportaciones de rutas
const shortenRoutes = require('../src/Shorten/Routes')

// Rutas
app.use('/api/v1/shorten', shortenRoutes)

// Init server
exports.initServer = () => {
    app.listen(port)
    console.log(`Server is running on port ${port}`)
}