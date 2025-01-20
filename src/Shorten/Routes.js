'use strict'

const express = require('express')
const router = express.Router()

const { createShorten, getUrl } = require('./Controller')


// Rutas
router.post('/shorten', createShorten)
router.get('/shorten/:shortUrl', getUrl)

module.exports = router