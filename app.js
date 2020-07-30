const cors = require('cors')
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const router = require('./routes/index.js')
const { customErrorHandler } = require('./middleware/error-handler.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/', router)
app.use(customErrorHandler)

app.listen(PORT, ()=> {
    console.log(`Port: ${PORT}`)
})

module.exports = app