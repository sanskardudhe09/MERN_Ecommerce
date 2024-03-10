const { default: slugify } = require('slugify');
const categoryModel = require('../model/categoryModel.js');
//api to create category
module.exports.createCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:"Caetgory Name is required!!"});
        }
        const existingUser = await categoryModel.findOne({name});
        if(existingUser){
            return res.status(200).send({message:"Category Already Exists!!"});
        }
        const newcategory = new categoryModel({name, slug:slugify(name)});
        await newcategory.save();
        console.log(newcategory);
        return res.status(201).json({
            message:"Category Created Successfully!!",
            category: newcategory,
        })
    } catch (error) {
        res.status(500).send({message:error});
    }
}

//api to update category
module.exports.updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        if(!name){
            return res.status(401).send({message:"Caetgory Name is required!!"});
        }
        const existingcategory = await categoryModel.findById(id);
        if(!existingcategory){
            return res.status(401).send({message:"Category NOt Found!!"})
        }
        const newcategory = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
        return res.status(200).send({
            message: "Category Updated Successfully!!",
            category: newcategory
        })

    } catch (error) {
        return res.status(500).send({message:error});
    }
}

module.exports.getAllCategoryController = async (req,res) => {
    try {
        const categories = await categoryModel.find({});
        if(!categories){
            return res.status(404).send({message:"Cannot GET Categories are empty!!"});
        }
        return res.status(200).send({
            message:"Got All Categories",
            category: categories
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

module.exports.getSingleCategoryController = async (req,res) => {
    try {
        const existingcategory = await categoryModel.findOne({slug:req.params.slug});
        if(!existingcategory){
            return res.status(404).send({message:"Category with given slug not found!!"});
        }
        return res.status(200).send({
            message: "Got the category",
            category:existingcategory,
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

module.exports.deleteCategoryController = async (req,res) => {
    try {
        const {id} = req.params;
        const existingcategory = await categoryModel.findById(id);
        if(!existingcategory){
            return res.status(404).send({message:"Cannot delete Category with given id not found!!"});
        }
        await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({message:"Category deleted successfully!!"});
    } catch (error) {
        return res.status(500).send({message:error});
    }
}
