const mongoose = require('mongoose');

module.exports = connect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("Connected to Mongo DB Successfully!!"))
    .catch((err)=> console.log(err));
};