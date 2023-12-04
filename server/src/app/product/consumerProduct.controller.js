const consumerProductModel = require("./consumerProduct.model");
const asyncHandler = require('express-async-handler');
const {deleteFile} = require('../../config/helpers');
const mongoose = require('mongoose');

class ProductConsumerController{
    getConsumerProducts = asyncHandler(async (req, res) => {
        const consumerProduct = await consumerProductModel.find({})
        res.json({
            result: consumerProduct,
            message: "All consumer products fetched",
            meta: null
        });
    })

    createConsumerProduct = asyncHandler(async (req, res, next) => {
        let payload = req.body;
        payload.user = req.authUser._id;
        payload.seller_name = req.authUser.name;
        payload.quantity = Number(payload.quantity);
        payload.price = Number(payload.price);

        if(!req.file){
            next({code: 400, message: "Image required"});
        }
        else{
            payload.image = req.file.filename;
        }

        const consumerProduct = new consumerProductModel(payload);
        const response = await consumerProduct.save();
        console.log(payload)
        res.json({
            result: response,
            message: "consumerProduct Created",
            meta: null
        })
    })

    getConsumerProductById = asyncHandler(async (req, res, next)=>{
        const consumerProduct = await consumerProductModel.findById(req.params.id);
        if(consumerProduct){
            res.json({
                result: consumerProduct,
                message: "consumerProduct Fetched",
                meta: null
            })
        }
        else{
            next({code: 404, message: "consumerProduct not found"});
        }
    })

    deleteConsumerProduct = asyncHandler(async (req, res, next)=>{
        const consumerProduct = await consumerProductModel.findById(req.params.id);
        if(consumerProduct){
            const deleted = await consumerProductModel.findByIdAndDelete(req.params.id);
            deleteFile('./public/uploads/consumers/', consumerProduct.image);

            res.json({
                result: deleted,
                message: "consumerProduct Deleted Successfully",
                meta: null
            })
        }
        else{
            next({code: 404, message: "consumerProduct not found"});
        }
    })

    updateconsumerProduct = asyncHandler(async (req, res, next)=>{
        const id = req.params.id;
        let payload = req.body;
        payload.quantity = Number(payload.quantity);
        payload.price = Number(payload.price);

        
        if(req.file)
            payload.image = req.file.filename;

        const update = await consumerProductModel.updateOne({_id: id}, payload);
        res.json({
            result: update,
            message: "consumerProduct Updated",
            meta: null
        })
    })

    createConsumerProductReview = asyncHandler(async (req, res, next)=>{
        const id = req.params.id;
        const payload = req.body;
        payload.rating = Number(payload.rating);

        const consumerProduct = await consumerProductModel.findById(id);
        
        if(consumerProduct) {
            const alreadyReviewed = (await consumerProductModel.findById(id)).reviews.map(r => r.user.toString() === req.authUser._id.toString()).pop();
            if(alreadyReviewed){
                next({code: 400, message: "Product already reviewed"});
            }
            const reviews = {
                name: req.authUser.name,
                rating: payload.rating,
                comment: payload.comment,
                user: req.authUser._id
            }

            await consumerProductModel.updateOne({_id: req.params.id}, {$push: {reviews: reviews}})
            let consumerProduct = await consumerProductModel.findById(id);
            let  numReviews = consumerProduct.reviews.length;
            let rating = consumerProduct.reviews.reduce((acc, item)=> item.rating + acc , 0)/consumerProduct.reviews.length;
            

            const updateData = {
                numReviews: numReviews,
                rating: rating
            }

            
            let response = await consumerProductModel.updateOne({_id: id}, updateData);

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

const consumerProductCtrl = new ProductConsumerController();
module.exports = consumerProductCtrl;