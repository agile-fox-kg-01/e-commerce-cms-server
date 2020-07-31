const express = require('express');
const userController = require('../controllers/user-controller');

const router = express();

router.post('/', userController.postUserLoginHandler);

module.exports = router;