const express = require('express')
const router = express.Router()
const ProductRouter = require('./product-route.js')
const UserRouter = require('./user-route.js')

router.use('/product', ProductRouter)
router.use('/user', UserRouter)

module.exports = router