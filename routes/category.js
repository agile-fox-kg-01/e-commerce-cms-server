const express = require('express');
const categoryController = require('../controllers/category-controller');
const { authentication, admin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', categoryController.getCategoryRootHandler);
router.post('/', authentication, admin, categoryController.postCategoryRootHandler);

module.exports = router;