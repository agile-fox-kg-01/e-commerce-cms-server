const express = require('express')
const router = express.Router()

const ControllerProduct = require('../controllers/controllerProduct')

router.get('/', ControllerProduct.getProducts)
router.post('/', ControllerProduct.postProducts)
router.patch('/:id', ControllerProduct.patchProducts)
router.delete('/:id', ControllerProduct.deleteProducts)

module.exports = router