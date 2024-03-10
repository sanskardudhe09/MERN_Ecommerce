const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "products",
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
    },
    status: {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    }
    
}, {timestamps:true})
module.exports = mongoose.model("orders", orderSchema);