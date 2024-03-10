const express = require('express');
const router = express.Router();
const {registerController, loginController, testController, forgotPasswordController, updateUserProfile, userOrderController, adminOrderController, updateStatusController, getAllUsersController} = require('../controller/authController.js');
const { verifySignIn, isAdmin } = require('../middleware/authMiddleware.js');

//user registeration api
router.post("/register", registerController);

//user login api
router.post("/login", loginController);

//forgot password route
router.post("/forgot-password", forgotPasswordController);
 
//private and protected route for users 
router.get("/authroute", verifySignIn, (req,res)=>{
    res.status(200).send({ok: true});
})

//private and protected route for admin
router.get("/admin-auth", verifySignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})

//api to update profile of user on user profile page
router.put("/profile", verifySignIn, updateUserProfile);

//api to track orders of users on User side
router.get("/order", verifySignIn, userOrderController);

//api to track orders from admin side
router.get("/allorder", verifySignIn, isAdmin, adminOrderController);

//api to update order status
router.put("/update-status/:orderId", verifySignIn, isAdmin, updateStatusController);

//api to get all users on admin user page
router.get("/get-allusers", verifySignIn, isAdmin, getAllUsersController);
module.exports = router;