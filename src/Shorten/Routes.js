'use strict'

const express = require('express')
const router = express.Router()

const { createShorten } = require('./Controller')


// Rutas
router.post('/shorten', createShorten)

module.exports = router