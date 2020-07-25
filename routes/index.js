const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const { auth, isAdmin } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login/google', UserController.oauthGoogle)

router.get('/products', auth, isAdmin, ProductController.browse)
router.get('/products/:id', auth, isAdmin, ProductController.read)
router.put('/products/edit/:id', auth, isAdmin, ProductController.edit)
router.post('/products/add', auth, isAdmin, ProductController.add)
router.delete('/products/delete/:id', auth, isAdmin, ProductController.delete)

module.exports = router
