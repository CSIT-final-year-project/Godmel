const { deleteFile } = require('../../config/helpers');
const categorySvc = require('../category/category.service')
const fs = require('fs');
class CategoryController{
    categoryCreate = async (req, res, next)=>{
        try{
            let payload = categorySvc.transformCreateRequest(req);

            const created = await categorySvc.storeCategory(payload);
            
            res.json({
                result: created,
                message: "Category Created Successfully",
                meta: null
            })
        }
        catch(except){
            next(except);        
        }
    }

    listAllCategorys = async (req, res, next)=>{
        try{
            let filter = {};
            if(req.query['search']){
                filter = {
                    $or: [
                        {title : new RegExp(req.query['search'], 'i')},
                        {description: new RegExp(req.query['search'], 'i')}
                    ]
                }
            }
            filter = {
                $and : [
                    {
                        createdBy: req.authUser._id
                    },
                    {...filter}
                ]
            }

            let limit = +req.query['limit']||10;
            let page = +req.query['page']||1;

            let skip = (page-1)*limit;

            let total = await categorySvc.countData(filter);

            let response = await categorySvc.listAllData(filter, {skip: skip, limit: limit}, {_id: 'desc'})

            res.json({
                result: response,
                message: "All the category are listed",
                meta: {
                    total: total,
                    currentpage: page,
                    limit: limit
                }
            })
        }
        catch(except){
            next('except');
        }
    }

    getDataById = async (req, res, next)=>{
        try{
            let filter = {
                _id: req.params.id,
            
                createdBy: req.authUser._id
            }
            
            let data = await categorySvc.getCategoryByFilter(filter)
            res.json({
                result: data,
                message: "Category Fetched",
                meta: null
            })
        }
        catch(except){
            console.log("getDataById:", except)
            next(except)
        }
    }

    updateById = async(req, res, next)=>{
        try{
            const content = req.content;
            if(content){
                const payload = categorySvc.transformEditRequest(req);
                const oldCategory = await categorySvc.updateCategoryById(req.params.id, payload);
                
                if(content.image !== oldCategory.image){
                    deleteFile('./public/uploads/category/', oldCategory.image);
                }

                res.json({
                    result: oldCategory,
                    message: "Category updated Successfully",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "User doesn't exist"});
            }
        }
        catch(except){
            console.log("updateById: ", except);
            next(except);
        }
    }

    deleteById = async(req, res, next)=>{
        try{
            let deleteCategory = await categorySvc.deleteCategoryById(req.params.id);
            if(deleteCategory.image)
                deleteFile('./public/uploads/category/', deleteCategory.image);

            res.json({
                result: deleteCategory,
                message: "Category deleted Successfully",
                meta: null
            })
        }
        catch(except){
            console.log("deleteById: ", except);
            next(except);
        }
    }

    listCategorysForHome = async(req, res, next)=>{
        try{
            let filter = {};
            if(req.query['search']){
                filter = {
                    $or: [
                        {
                            title: new RegExp(req.query['search'], 'i')
                        },
                        {
                            description: new RegExp(req.query['search'], 'i')
                        }
                    ]
                }
            }

            filter = {
                $and: [
                    {
                        status: "active"
                    },
                    {...filter}
                ]
            }

            let page = req.query['page'] || 1;
            let limit = req.query['limit'] || 15;

            let total = await categorySvc.countData(filter);
            let skip = (page-1)*limit;

            let sort = {
                _id: "desc"
            }

            if(req.query.sort){
                //FE --> title = sort;
                let split = req.query.sort.split('='); 

                sort = {[split[0]]: split[1]}  //array ko element lai key banaunde [] vitra rakhne
            }

            let response = await categorySvc.listAllData(filter,
                // startDate: {$lte: new Date()},
                // endDate: {$gte: new Date()}      //time rakhne vaye
                {skip: skip, limit: limit}, sort)  //asc - ascending,  desc - descending

            res.json({
                result: response,
                message: "Listing for home page",
                meta: {
                    page: page,
                    total: total,
                    limit: limit
                }
            })
        }
        catch(except){
            console.log("listCategorysForHome: ", except);
            next(except);
        }
    }

    getDetailBySlug = async(req, res, next)=>{
        try{
            let categoryDetail = await categorySvc.getCategoryByFilter({
                slug: req.params.slug,
                status: "active"
            })
             //product - list
            res.json({
                result: {
                    detail: categoryDetail,
                    products: null
                },
                message: "Category detail from null", 
                meta: null
            })
        }
        catch(except){
            console.log("Get detail by slug: ", getDetailBySlug);
            next(except);
        }
    }
}

const categoryCtrl = new CategoryController();

module.exports = categoryCtrl;