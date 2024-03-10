const express = require('express');
const JWT = require('jsonwebtoken');
const userModel = require('../model/model.js');
const orderModel = require('../model/orderModel.js');
const {createHashPwd, verifyPwd} = require('../helper/authHelper.js');

module.exports.registerController =  async (req,res) => {
    try{
        const {name, email, password, phone, address, answer} = req.body;
        if(!name) return res.status(400).send("Error: Name is required!!");
        if(!email) return res.status(400).send("Error: Email is required!!");
        if(!password) return res.status(400).send("Error: Password is required!!");
        if(!phone) return res.status(400).send("Error: Phone No is required!!");
        if(!address) return res.status(400).send("Error: Address is required!!");
        if(!answer) return res.status(400).send("Error: Answer field is required!!");
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.send({error: 'User is Already Registered!!', user: existingUser})
        const hashedPwd = await createHashPwd(password);
        const newUser = await userModel.create({name, email, password:hashedPwd,phone,address,answer});
        return res.status(201).send({Message: 'User is registered!!', user: newUser});
    }catch(err){
        console.log(err);
        res.status(500).send({error: 'Error in registeration!!'});
    }
}

module.exports.loginController = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).send({message: 'User with the given email not found'});
        const isValidPwd = await verifyPwd(password, user.password);
        if(isValidPwd === false) return res.status(200).send({message: 'Incorrect Password!!'});
        const token = await JWT.sign({_id: user._id}, process.env.SECRET_KEY, { expiresIn: '30d'});
        return res.status(200).send({
            message: 'Login Successful!!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                answer: user.answer,
                password: user.password,
                role: user.role
            },
            token: token
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: 'Error in Login'});
    }
}
 //api for forgot password functionality
module.exports.forgotPasswordController = async (req,res) => {
    try{
        const { email, newpassword, answer } = req.body;
        if(!email){
            return res.status(400).send({message: "Email is Required!!"});
        }
        if(!newpassword){
            return res.status(400).send({message: "New Password is Required!!"});
        }
        if(!answer){
            return res.status(400).send({message: "Answer field is required!!"});
        }
        const user = await userModel.findOne({email, answer});
        if(!user) return res.status(404).send({message: "User Not Found!!"});
        const hashedPwd = await createHashPwd(newpassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashedPwd});
        return res.status(200).send({ user: user, message: "Password Updated Successfully!!"});
    }catch(e){
        return res.status(500).send({message: "Something went wrong!!"});
    }
 
}
//testing purpose controller for verifying valid tokens and admin access
//role field for user is 1 for admin , 0 for users.
module.exports.testController = (req,res) => {
    try{
        console.log("Test Route Succeded!!")
        res.status(200).send("Test Route Succeeded!!");
    }catch(err){
        console.log(err);
    }
}

//api to update user on user profile page
module.exports.updateUserProfile = async (req,res) => {
    try {
        const {name, email, password, address, phone} = req.body;
        const user = await userModel.findById(req.user._id);
        if(password && password.length < 3){
            return res.status(400).send({message: "Password must be longer than 3 characters!!"})
        }
        const hashedPwd = password ? await createHashPwd(password) : undefined;
        const newuser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            email: email || user.email,
            password: hashedPwd || user.password,
            address: address || user.password,
            phone: phone || user.phone
        }, {new:true})
        return res.status(200).send({
            message: "User Updated Successfully!!",
            newuser: newuser
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api for listing user orders on user order page
module.exports.userOrderController = async (req,res) => {
    try {
        const orders = await orderModel.find({buyer: req.user._id})
        .populate("products", "-photo").populate("buyer", "name")
        return res.json(orders);
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

module.exports.adminOrderController = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        .populate("products", "-photo").populate("buyer", "name").sort({createdAt: "-1"});
        return res.json(orders);
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

module.exports.updateStatusController = async (req,res) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true});
        return res.json(orders);
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

module.exports.getAllUsersController = async (req,res) => {
    try {
        const users = await userModel.find({"role": 0})
        return res.send(users);
    } catch (error) {
        return res.status(500).send({message:error});
    }
}