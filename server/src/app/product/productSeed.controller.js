const SeedModel = require("./productSeed.model");
const asyncHandler = require('express-async-handler');
const {deleteFile} = require('../../config/helpers');
const mongoose = require('mongoose');
const { findById } = require("../user/user.model");

class ProductSeedController{
    getSeedProducts = asyncHandler(async (req, res) => {
        const productSeed = await SeedModel.find({})
        res.json({
            result: productSeed,
            message: "All seeds fetched",
            meta: null
        });
    })

    createSeedProduct = asyncHandler(async (req, res, next) => {
        let payload = req.body;
        payload.user = req.authUser._id;
        payload.countInStock = Number(payload.countInStock);
        payload.price = Number(payload.price);

        if(!req.file){
            next({code: 400, message: "Image required"});
        }
        else{
            payload.image = req.file.filename;
        }

        const seed = new SeedModel(payload);
        const response = await seed.save();
        res.json({
            result: response,
            message: "Seed Created",
            meta: null
        })
    })

    getSeedProductById = asyncHandler(async (req, res, next)=>{
        const productSeed = await SeedModel.findById(req.params.id);
        if(productSeed){
            res.json({
                result: productSeed,
                message: "Seed Fetched",
                meta: null
            })
        }
        else{
            next({code: 404, message: "Seed not found"});
        }
    })

    deleteSeedProduct = asyncHandler(async (req, res, next)=>{
        const productSeed = await SeedModel.findById(req.params.id);
        if(productSeed){
            const deleted = await SeedModel.findByIdAndDelete(req.params.id);
            deleteFile('./public/uploads/seeds/', productSeed.image);

            res.json({
                result: deleted,
                message: "Seed Deleted Successfully",
                meta: null
            })
        }
        else{
            next({code: 404, message: "Seed not found"});
        }
    })

    updateSeedProduct = asyncHandler(async (req, res, next)=>{
        const id = req.params.id;
        let payload = req.body;
        payload.countInStock = Number(payload.countInStock);
        payload.price = Number(payload.price);

        
        if(req.file)
            payload.image = req.file.filename;

        const update = await SeedModel.updateOne({_id: id}, payload);
        res.json({
            result: update,
            message: "Seed Updated",
            meta: null
        })
    })

    createSeedProductReview = asyncHandler(async (req, res, next)=>{
        const id = req.params.id;
        const payload = req.body;
        payload.rating = Number(payload.rating);

        const productSeed = await SeedModel.findById(id);
        
        if(productSeed) {
            const alreadyReviewed = (await SeedModel.findById(id)).reviews.map(r => r.user.toString() === req.authUser._id.toString()).pop();
            if(alreadyReviewed){
                next({code: 400, message: "Product already reviewed"});
            }
            const reviews = {
                name: req.authUser.name,
                rating: payload.rating,
                comment: payload.comment,
                user: req.authUser._id
            }

            await SeedModel.updateOne({_id: req.params.id}, {$push: {reviews: reviews}})
            let seed = await SeedModel.findById(id);
            let  numReviews = seed.reviews.length;
            let rating = seed.reviews.reduce((acc, item)=> item.rating + acc , 0)/seed.reviews.length;
            

            const updateData = {
                numReviews: numReviews,
                rating: rating
            }

            
            let response = await SeedModel.updateOne({_id: id}, updateData);

            res.json({
                result: response,
                message: "Reviewed",
                meta: null
            })
        }
        else{
            next( {code: 401, message: "Product not found"});
        }
    })
}

const productSeedCtrl = new ProductSeedController();
module.exports = productSeedCtrl;