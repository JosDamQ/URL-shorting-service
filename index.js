'use strict'

process.loadEnvFile()

const { initServer } = require('./config/app')
const { connect } = require('./config/mongo')

connect()
initServer()
