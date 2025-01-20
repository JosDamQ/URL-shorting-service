'use strict'

const express = require('express')
const router = express.Router()

const { test } = require('./Controller')


// Rutas
router.get('/test', test)

module.exports = router