const LendMachineModel = require("./productLendMachine.model");
const asyncHandler = require('express-async-handler');
const {deleteFile} = require('../../config/helpers');
const mongoose = require('mongoose');

class ProductLendMachineController{
    getLendMachines = asyncHandler(async (req, res) => {
        const productLendMachine = await LendMachineModel.find({})
        res.json({
            result: productLendMachine,
            message: "All lendmachines fetched",
            meta: null
        });
    })

    createLendMachine = asyncHandler(async (req, res, next) => {
        let payload = req.body;
        payload.user = req.authUser._id;
        payload.quantity = Number(payload.quantity);
        payload.price = Number(payload.price);

        if(!req.file){
            next({code: 400, message: "Image required"});
        }
        else{
            payload.image = req.file.filename;
        }

        const lendmachine = new LendMachineModel(payload);
        const response = await lendmachine.save();
        res.json({
            result: response,
            message: "LendMachine Created",
            meta: null
        })
    })

    getLendMachineById = asyncHandler(async (req, res, next)=>{
        const productLendMachine = await LendMachineModel.findById(req.params.id);
        if(productLendMachine){
            res.json({
                result: productLendMachine,
                message: "LendMachine Fetched",
                meta: null
            })
        }
        else{
            next({code: 404, message: "LendMachine not found"});
        }
    })

    deleteLendMachine = asyncHandler(async (req, res, next)=>{
        const productLendMachine = await LendMachineModel.findById(req.params.id);
        if(productLendMachine){
            const deleted = await LendMachineModel.findByIdAndDelete(req.params.id);
            deleteFile('./public/uploads/lendmachines/', productLendMachine.image);

            res.json({
                result: deleted,
                message: "LendMachine Deleted Successfully",
                meta: null
            })
        }
        else{
            next({code: 404, message: "LendMachine not found"});
        }
    })

    updateLendMachine = asyncHandler(async (req, res, next)=>{
        const id = req.params.id;
        let payload = req.body;
        payload.quantity = Number(payload.quantity);
        payload.price = Number(payload.price);

        
        if(req.file)
            payload.image = req.file.filename;

        const update = await LendMachineModel.updateOne({_id: id}, payload);
        res.json({
            result: update,
            message: "LendMachine Updated",
            meta: null
        })
    })

    createLendMachineReview = asyncHandler(async (req, res, next)=>{
        const id = req.params.id;
        const payload = req.body;
        payload.rating = Number(payload.rating);

        const productLendMachine = await LendMachineModel.findById(id);
        
        if(productLendMachine) {
            const alreadyReviewed = (await LendMachineModel.findById(id)).reviews.map(r => r.user.toString() === req.authUser._id.toString()).pop();
            if(alreadyReviewed){
                next({code: 400, message: "Product already reviewed"});
            }
            const reviews = {
                name: req.authUser.name,
                rating: payload.rating,
                comment: payload.comment,
                user: req.authUser._id
            }

            await LendMachineModel.updateOne({_id: req.params.id}, {$push: {reviews: reviews}})
            let lendmachine = await LendMachineModel.findById(id);
            let  numReviews = lendmachine.reviews.length;
            let rating = lendmachine.reviews.reduce((acc, item)=> item.rating + acc , 0)/lendmachine.reviews.length;
            

            const updateData = {
                numReviews: numReviews,
                rating: rating
            }

            
            let response = await LendMachineModel.updateOne({_id: id}, updateData);

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

const productLendMachineCtrl = new ProductLendMachineController();
module.exports = productLendMachineCtrl;