const CategoryModel = require('../category/category.model')
const slugify = require('slugify');

class CategoryService{
    transformCreateRequest =(req, isEdit = false)=>{
        let data = {
            ...req.body
        }

        if (!req.file && isEdit === false) {
            data.image = null;
        }
        else {
            if(req.file)
                data.image = req.file.filename;
        }
        data.slug = slugify(req.body.cropType, {
            replacement: '-',
            lower: true
        })

        if(!req.body.parentId || req.body.parentId === 'null' || req.body.parentId === '')
            data.parentId = null;

        if(!isEdit)
            data.createdBy = req.authUser._id;

        return data;
    }

    transformEditRequest =(req)=>{
        let data = {
            ...req.body
        }

        if (req.file) {
            data.image = req.file.filename;
        }

        return data;
    }

    storeCategory = async(payload) =>{
        try{
            let category = new CategoryModel(payload);
            let response = await category.save();
            return response;
        }
        catch(excpt){
            if(excpt.code === 11000){
                excpt = {code: 400, message: "Category name should be unique"}
            }
            throw excpt;
        }
    }

    listAllData = async(filter = {}, paging = {skip: 0, limit: 15}, sort = {_id: 'desc'})=>{
        try{
            
            let list = await CategoryModel.find(filter)
                                        .populate('createdBy', ['_id', 'name'])
                                        .populate('parentId', ['id', 'cropType', 'slug'])
                                        .sort(sort)
                                        .skip(paging.skip)
                                        .limit(paging.limit)
            return list;
        }
        catch(xcept){
            throw xcept;
        }
    }

    countData = async(filter = {})=>{
        try{

            let count = await CategoryModel.countDocuments(filter);
            return count;
        }
        catch(exception){
            console.log("Count category: ", exception)
            throw exception;
        }
    }

    getCategoryByFilter = async(filter)=>{
        try{
            console.log(filter)
            let response = await CategoryModel.findOne(filter)
                .populate('createdBy', ['_id', 'name'])
                .populate('parentId', ['id', 'cropType', 'slug'])

            if(response)
                return response;
            else    
                throw {code: 404, message: "Category doesn't exist"};
        }
        catch(except){
            console.log("getByIdSvc: ", except)
            throw except;
        }
    }

    updateCategoryById = async(id, data)=>{
        try{
            let response = await CategoryModel.findByIdAndUpdate(id, {$set: data});
            return response;
        }
        catch(except){
            console.log("Service - updateCategoryById: ", except);
            throw except;
        }
    }

    deleteCategoryById = async(id)=>{
        try{
            let response = await CategoryModel.findByIdAndDelete(id);
            if(response){
                return response;
            }
            else{
                throw ({code: 404, message: "Category already deleted or doesn't exist"})
            }
        }
        catch(except){
            console.log("Service - deleteCategoryById: ", except);
            throw except;
        }
    }
}

const categorySvc = new CategoryService();
module.exports = categorySvc;