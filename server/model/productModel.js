const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true,
    },
    desc:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    prodcategory:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "category",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    photo:{
        data: Buffer,
        contentType: String,
    },
    shipping:{
        type:Boolean
    }

},{timestamps:true})
module.exports = mongoose.model("products", productSchema);