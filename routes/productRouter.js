const express = require('express')
const router = express.Router()

const ControllerProduct = require('../controllers/controllerProduct')
const { authentication, isAdmin } = require('../midlewares/auth')
router.get('/', authentication, isAdmin, ControllerProduct.getProducts)
router.post('/', authentication, isAdmin, ControllerProduct.postProducts)
router.patch('/:id', authentication, isAdmin, ControllerProduct.patchProducts)
router.delete('/:id', authentication, isAdmin, ControllerProduct.deleteProducts)

module.exports = router