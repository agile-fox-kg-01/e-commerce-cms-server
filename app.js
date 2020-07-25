const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
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