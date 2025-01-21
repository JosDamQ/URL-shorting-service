'use strict'

const express = require('express')
const router = express.Router()

const { createShorten, getUrl, updateUrl, deleteUrl } = require('./Controller')


// Rutas
router.post('/shorten', createShorten)
router.get('/shorten/:shortUrl', getUrl)
router.put('/shorten/:shortUrl', updateUrl)
router.delete('/shorten/:shortUrl', deleteUrl)

module.exports = router