const express = require('express');
const productContMethods = require('../controller/productController');
const router = express.Router();
const {isAuthenticateUser,AuthorizeRole} = require("../middleware/authenticate");

router.route('/products').get(isAuthenticateUser,productContMethods.getProducts)
router.route('/product/create').post(isAuthenticateUser,AuthorizeRole('admin'),productContMethods.createProduct);
// router.route('/product/:id').get(productContMethods.getProductByID);
// router.route('/product/:id').put(productContMethods.updateProductHandler);
router.route('/product/:id').get(productContMethods.getProductByID).put(productContMethods.updateProductHandler).delete(productContMethods.deleteProduct);

module.exports = router;
