 const JWT = require('jsonwebtoken');
 const userModel = require('../model/model.js');
 module.exports.verifySignIn = async (req,res,next) => {
    try {
        let decode = JWT.verify(req.headers.authorization, process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
 }

 module.exports.isAdmin = async (req,res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({Error: 'Unauthorised Access'});
        }else{
            console.log(user);
            next();
        }
    } catch (error) {
        console.log(req.user);
        res.status(500).send({Error: 'Error in Admin'});
    }
 }
