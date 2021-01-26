const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const CustomerController = require('../controllers/CustomerController')
const { auth, isAdmin, isOwner } = require('../middlewares/auth')

// user
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login/google', UserController.oauthGoogle)

// cms
router.get('/products', auth, isAdmin, ProductController.browse)
router.get('/products/:id', auth, isAdmin, ProductController.read)
router.put('/products/edit/:id', auth, isAdmin, ProductController.edit)
router.post('/products/add', auth, isAdmin, ProductController.add)
router.delete('/products/delete/:id', auth, isAdmin, ProductController.delete)

// customer
router.get('/', CustomerController.browse)
router.get('/product/:id', CustomerController.read)
router.post('/addToCart/:id', auth, CustomerController.addCart)
router.get('/carts', auth, CustomerController.showCart)
router.delete('/carts/delete/:id', auth, isOwner, CustomerController.deleteCartItem)

module.exports = router
