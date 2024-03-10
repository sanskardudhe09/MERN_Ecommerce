const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../model/model.js');

module.exports.createHashPwd = async (password) => {
    try{
        const salt = 4;
        const hashedPwd = await bcrypt.hash(password, salt);
        return hashedPwd;
    }catch(err){
        console.log(err);
    }
}

module.exports.verifyPwd = async (password, hashedPwd) => {
    return await bcrypt.compare(password, hashedPwd);
}