const express = require('express');
const productController = require('../controllers/product-controller');
const { authentication, authorization, admin } = require('../middlewares/auth');

const router = express();

router.get('/', authentication, productController.getProductRootHandler);
router.post('/', authentication, admin, productController.postProductRootHandler);
router.get('/:id', authentication, admin, productController.getProductByIdHandler);
router.put('/:id', authentication, admin, productController.putProductByIdHandler);
router.delete('/:id', authentication, admin, productController.deleteProductByIdHandler);

module.exports = router;