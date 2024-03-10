const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    slug:{
        type:String,
        lowercase:true,
    },
})
module.exports = mongoose.model("category", categorySchema);