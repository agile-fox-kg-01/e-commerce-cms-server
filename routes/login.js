const express = require('express');
const userController = require('../controllers/user-controller');

const router = express();

router.post('/', userController.postUserRootHandler);

module.exports = router;