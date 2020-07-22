const express = require('express');

const login = require('./login');
const product = require('./product');

const router = express();

router.use('/login', login);
router.use('/product', product);

module.exports = router;