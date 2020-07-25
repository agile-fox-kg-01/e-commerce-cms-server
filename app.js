require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
const routes = require('./routes/index')
const errorhandler = require('./middlewares/errorhandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', routes)
app.use(errorhandler)

module.exports = app