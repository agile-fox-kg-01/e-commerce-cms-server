const express = require('express');
const cartController = require('../controllers/cart-controller');
const { authentication, cartAuthorization } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authentication, cartAuthorization, cartController.getCartRootHandler);
router.post('/', authentication, cartAuthorization, cartController.postCartRootHandler);
router.put('/:productId', authentication, cartAuthorization, cartController.putCartProductRootHandler);

module.exports = router;