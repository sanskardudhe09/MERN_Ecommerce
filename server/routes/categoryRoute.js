const { createCategoryController, updateCategoryController, getAllCategoryController, getSingleCategoryController, deleteCategoryController } = require('../controller/categoryController.js');
const { verifySignIn, isAdmin } = require('../middleware/authMiddleware.js');
const express = require('express');
const router = express.Router();

//create category
router.post("/create-category", verifySignIn, isAdmin, createCategoryController);

//update category
router.put("/update-category/:id", verifySignIn, isAdmin, updateCategoryController);

//get all category
router.get("/getall-category", getAllCategoryController);

//get single category
router.get("/get-category/:slug", getSingleCategoryController)

//delete category
router.delete("/delete-category/:id", verifySignIn, isAdmin, deleteCategoryController)
module.exports = router;