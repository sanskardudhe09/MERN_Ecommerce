const { default: slugify } = require('slugify');
const productModel = require('../model/productModel.js');
const fs = require('fs');
const categoryModel = require('../model/categoryModel.js');
const dotenv = require('dotenv');
var braintree = require("braintree");
const orderModel = require('../model/orderModel.js');
dotenv.config();
//braintree payment integration
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
//api to create product
module.exports.createProductController = async (req,res) => {
    try {
        const {name, desc, price, prodcategory, quantity, shipping} = req.fields;
        const {photo} = req.files;
        switch(true){
            case !name:
                return res.status(404).send({message:"Product Name is required!!"});
            case !desc:
                return res.status(404).send({message:"Product Description is required!!"});
            case !price:
                return res.status(404).send({message:"Product Price is required!!"});
            case !prodcategory:
                return res.status(404).send({message:"Product Category is required!!"});
            case !quantity:
                return res.status(404).send({message:"Product Quantity is required!!"});
            case photo && photo.size > 1000000:
                return res.status(401).send({message:"Product photo size must be less than 1 MB!!"});
        }
        const newproduct = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            newproduct.photo.data = fs.readFileSync(photo.path);
            newproduct.photo.contentType = photo.type;
        }
        await newproduct.save();
        return res.status(201).send({
            message: "Product Created Successfully!!",
            product: newproduct,
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}
//api to update product
module.exports.updateProductController = async (req,res) => {
    try {
        const {name, desc, price, prodcategory, quantity, shipping} = req.fields;
        const {photo} = req.files;
        switch(true){
            case !name:
                return res.status(404).send({message:"Product Name is required!!"});
            case !desc:
                return res.status(404).send({message:"Product Description is required!!"});
            case !price:
                return res.status(404).send({message:"Product Price is required!!"});
            case !prodcategory:
                return res.status(404).send({message:"Product Category is required!!"});
            case !quantity:
                return res.status(404).send({message:"Product Quantity is required!!"});
            case photo && photo.size > 1000000:
                return res.status(401).send({message:"Product photo size must be less than 1 MB!!"});
        }
        const newproduct = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(name)}, {new:true});
        if(photo){
            newproduct.photo.data = fs.readFileSync(photo.path);
            newproduct.photo.contentType = photo.type;
        }
        await newproduct.save();
        return res.status(201).send({
            message: "Product Updated Successfully!!",
            product: newproduct,
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}
//api to get all products
module.exports.getAllProductsController = async (req,res) => {
    try {
        const products = await productModel.find({}).populate("prodcategory")
        .select("-photo").limit(6).sort({createdAt: -1})
        res.status(200).send({
            message:"Got All Products",
            products:products
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to get a single product
module.exports.getSingleProductController = async (req,res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("prodcategory")
        return res.status(200).send({
            message: "Got the product",
            product: product,
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to get product photo
module.exports.getPhotoController = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(!product){
            return res.status(404).send({message:"Product with given id not found!!"});
        }
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to delete product
module.exports.deleteProductController = async (req,res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        if(!product){
            return res.status(404).send({message:"Can't delete product..Product Not Found"});
        }
        return res.status(200).send({
            message:"Product Deleted Successfully!!",
            product:product
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to get products by filters based on price and category 
module.exports.productFilterController = async (req,res) => {
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length){
            args.price = { $gte: radio[0], $lte: radio[1]};
        }
        const products = await productModel.find(args);
        return res.status(200).send({
            message: "Products Filtered Successfully!!",
            product: products,
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to get total product count
module.exports.getProdCountController = async (req,res) => {
    try {
        const count = await productModel.find({}).estimatedDocumentCount();
        return res.status(200).send({
            message: "Got the Product Counts",
            count: count,
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to get products lists on basis of pagination
module.exports.getProdListByPage = async (req,res) => {
    try {
        const page = req.params.page ? req.params.page : 1;
        const perPage = 6;
        const products = await productModel.find({}).select("-photo").skip((page-1) * perPage).limit(6).sort({createdAt: -1})
        return res.status(200).send({
            message: "Got the products as per pagination",
            products
        })
    } catch (error) {
        return res.status(500).send({message:error})
    }
}

//api to search products based on search bar
module.exports.searchProdController = async (req,res) => {
    try {
        const {keyword} = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex : keyword, $options : 'i'}},
                {desc: { $regex: keyword, $options: 'i'}},
            ],
        }).select("-photo");
        return res.json(results);
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to get similar products on single prod details page
module.exports.similarProdController = async (req,res) => {
    try {
        const {pid, cid} = req.params;
        const products = await productModel.find({
            prodcategory: cid,
            _id :{$ne: pid}
        }).select("-photo").limit(2).populate("prodcategory")
        return res.status(200).send({
            message: "Got Similar Products",
            products: products
        });
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api to get all products based on category
module.exports.getProdsByCategory = async (req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        const products = await productModel.find({prodcategory:category}).populate("prodcategory");
        return res.status(200).send({
            message: "Got Products as per Category",
            category: category,
            products: products
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api for handling client tokens generated by Braintree server
module.exports.braintreeTokenController = async (req,res) => {
    try {
        gateway.clientToken.generate({}, function(err, response){
            if(err){
                return res.status(500).send({message:err});
            }else{
                res.send(response);
            }
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

//api for handling payments
module.exports.braintreePaymentController = async (req,res) => {
    try {
        const {nonce, cart} = req.body;
        let total = 0;
        cart.map((item) => total += item.price);
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, (err, result) => {
            if(result){
                let order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save();
                res.json({ok:true});
            }else{
                res.status(500).send({message:err});
            }
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}