const express = require('express')
const router = express.Router()
const Controller = require('./controller.js')
const authentication = require('./middlewares/auth.js')

router.post('/login', Controller.login)

router.post('/products', authentication, Controller.create)
router.get('/products', authentication, Controller.findAll)
router.put('/products/:id', authentication, Controller.update)
router.delete('/products/:id', authentication, Controller.delete)


module.exports = router