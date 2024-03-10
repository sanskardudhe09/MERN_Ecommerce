const express = require('express');
const { verifySignIn, isAdmin } = require('../middleware/authMiddleware');
const { createProductController, getAllProductsController, getSingleProductController, updateProductController, getPhotoController, deleteProductController, productFilterController, getProdCountController, getProdListByPage, searchProdController, similarProdController, getProdsByCategory, braintreeTokenController, braintreePaymentController } = require('../controller/productController');
const formidable = require('express-formidable')
const router = express.Router();

//create product
router.post("/create-product", verifySignIn, isAdmin,formidable(), createProductController);

//update product
router.put("/update-product/:pid", verifySignIn, isAdmin, formidable(), updateProductController);

//get all products
router.get("/getall-products", getAllProductsController);

//get product
router.get("/get-product/:slug", getSingleProductController);

//get product photo
router.get("/product-photo/:pid", getPhotoController);

//delete product
router.delete("/delete-product/:pid", verifySignIn, isAdmin, deleteProductController );

//get product by filers
router.post("/product-filters", productFilterController);

//get total product count
router.get("/product-count", getProdCountController);

//get products based on pagination
router.get("/product-list/:page", getProdListByPage);

//api to globally search products based on search bar
router.get("/search/:keyword", searchProdController);

//api to get similar products based on single prod page
router.get("/similar-products/:pid/:cid", similarProdController);

//api to get all products based on a specefic category
router.get("/category-product/:slug", getProdsByCategory);

//api for braintree token 
router.get("/braintree-token", braintreeTokenController);

//api for handling payments
router.post("/payment", verifySignIn, braintreePaymentController);
module.exports = router;