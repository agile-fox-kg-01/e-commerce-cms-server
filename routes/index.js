const express = require('express');

const login = require('./login');
const register = require('./register');
const product = require('./product');
const category = require('./category');
const cart = require('./cart');
const transaction = require('./transaction');

const router = express();

router.use('/login', login);
router.use('/register', register);
router.use('/product', product);
router.use('/category', category);
router.use('/cart', cart);
router.use('/transaction', transaction);

module.exports = router;