const express = require('express')
const router = express.Router()
const ProductController = require('../controller/product-controller.js')
const {authentication, authorization} = require('../middleware/auth.js')

router.post('/', authentication, authorization, ProductController.create)
router.get('/', authentication, authorization, ProductController.read)
router.get('/:id', authentication, authorization, ProductController.readById)
router.put('/:id', authentication, authorization, ProductController.update)
router.delete('/:id', authentication, authorization, ProductController.delete)

module.exports = router