const ProductModel = require("./product.model")
const ProductRequest = require("./product.request")
const productSvc = require("./product.service")

class ProductController{
    createProduct = async(req, res, next)=>{
        try{
            let payload = (new ProductRequest(req)).createTransform()
            payload.slug = await productSvc.checkSlug(payload.slug)
            const createdProduct = await productSvc.create(payload)

            res.json({
                result: createdProduct,
                message: "Product Created Successfully",
                meta: null
            })
        }
        catch(except){
            next(except)
        }
    }

    listForHome = async (req, res, next)=>{
        try{
            let {filter, pagination: {page, limit, skip}} = productSvc.getFilter(req.query, req.authUser);
            // filter 
            filter = {
                $and: [
                    ...filter['$and'],
                    {status: "active"}
                ]
            }
            const count = await productSvc.countData(filter)
            const data = await productSvc.getData(filter, {limit, skip})

            res.json({
                result: data, 
                message: "Product Fetched successfully",
                meta: {
                    page: page,
                    total: count, 
                    limit: limit
                }
            })
        }
        catch(except){
            next(except)
        }
    }

    listAllProducts = async (req, res, next) => {
        try {
            const {filter, pagination: {page, limit, skip}} = productSvc.getFilter(req.query, req.authUser);
            const count = await productSvc.countData(filter)
            const data = await productSvc.getData(filter, {limit, skip})

            res.json({
                result: data, 
                message: "Product Fetched successfully",
                meta: {
                    page: page,
                    total: count, 
                    limit: limit
                }
            })
        } catch(exception) {
            next(exception)
        }
    }

    getBySlug =async(req, res, next) => {
        try {
            let filter = {
                slug: req.params.slug,
                status: "active"
            }
            
            let detail = await productSvc.getBySlugWithProduct(filter)
            res.json({
                result: detail, 
                message: "Product Detail fetched",
                meta: null
            })
        } catch(exception) {
            next(exception)
        }
    }


    getById = async(req, res, next) => {
        try {
            let filter = {
                _id: req.params.id,
            }
            // if(req.authUser.role !== 'root'){
            filter = {
                ...filter, 
                createdBy: req.authUser._id
            }
            // }
            let detail = await productSvc.getByFilter(filter)
            res.json({
                result: detail, 
                message: "Product Detail fetched",
                meta: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    updateById = async (req, res, next) => {
        try {
            const product = req.content;
            const payload = (new ProductRequest(req)).updateTransform(product)
            const updated = await productSvc.updateById(req.params.id, payload);
            

            res.json({
                result: updated,
                message: "Product Updated",
                meta: null
            })

        } catch(exception) {
            next(exception)
        }

    }

    deleteById = async(req,res, next) => {
        try {
            let deleted = await productSvc.deleteById(req.params.id)
            if(deleted.image) {
                deleteFile("./public/uploads/product/", deleted.image)
            }
            res.json({
                result: deleted, 
                message: "Product Deleted successfully",
                meta: null
            })
        } catch(exception){
            next(exception)
        }
    }

    createProductReview = async(req, res, next)=>{
        try{
            const id = req.params.id;
            const payload = req.body;
            payload.rating = Number(payload.rating);

            const alreadyReviewed = (await ProductModel.findById(id)).reviews.map(r => r.user.toString() === req.authUser._id.toString()).pop();
            if(alreadyReviewed){
                next({code: 400, message: "Product already reviewed"});
            }
            const reviews = {
                rating: payload.rating,
                comment: payload.comment,
                user: req.authUser._id
            }

            await ProductModel.updateOne({_id: req.params.id}, {$push: {reviews: reviews}})
            let Product = await ProductModel.findById(id);
            let  numReviews = Product.reviews.length;
            let rating = Product.reviews.reduce((acc, item)=> item.rating + acc , 0)/Product.reviews.length;
            

            const updateData = {
                numReviews: numReviews,
                rating: rating
            }

            
            let response = await ProductModel.updateOne({_id: id}, updateData);

            res.json({
                result: response,
                message: "Reviewed",
                meta: null
            })
        }
        catch(except){
            next(except)
        }
    }

    listReview = async(req, res, next)=>{
        try{
            let review = await productSvc.getReview(req.params.id);
            return review;
        }
        catch(except){
            next(except);
        }
    }


}

const productCtrl = new ProductController()
module.exports = productCtrl