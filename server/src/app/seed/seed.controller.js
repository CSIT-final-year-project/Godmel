const SeedModel = require("./seed.model")
const SeedRequest = require("./seed.request")
const seedSvc = require("./seed.service")

class SeedController{
    createSeed = async(req, res, next)=>{
        try{
            let payload = (new SeedRequest(req)).createTransform()
            payload.slug = await seedSvc.checkSlug(payload.slug)
            const createdSeed = await seedSvc.create(payload)

            res.json({
                result: createdSeed,
                message: "Seed Created Successfully",
                meta: null
            })
        }
        catch(except){
            next(except)
        }
    }

    listForHome = async (req, res, next)=>{
        try{
            let {filter, pagination: {page, limit, skip}} = seedSvc.getFilter(req.query, req.authUser);
            // filter 
            filter = {
                $and: [
                    ...filter['$and'],
                    {status: "active"}
                ]
            }
            const count = await seedSvc.countData(filter)
            const data = await seedSvc.getData(filter, {limit, skip})

            res.json({
                result: data, 
                message: "Seed Fetched successfully",
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

    listAllSeeds = async (req, res, next) => {
        try {
            const {filter, pagination: {page, limit, skip}} = seedSvc.getFilter(req.query, req.authUser);
            const count = await seedSvc.countData(filter)
            const data = await seedSvc.getData(filter, {limit, skip})

            res.json({
                result: data, 
                message: "Seed Fetched successfully",
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
            
            let detail = await seedSvc.getBySlugWithSeed(filter)
            res.json({
                result: detail, 
                message: "Seed Detail fetched",
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
            let detail = await seedSvc.getByFilter(filter)
            res.json({
                result: detail, 
                message: "Seed Detail fetched",
                meta: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    updateById = async (req, res, next) => {
        try {
            const seed = req.content;
            const payload = (new SeedRequest(req)).updateTransform(seed)
            const updated = await seedSvc.updateById(req.params.id, payload);
            

            res.json({
                result: updated,
                message: "Seed Updated",
                meta: null
            })

        } catch(exception) {
            next(exception)
        }

    }

    deleteById = async(req,res, next) => {
        try {
            let deleted = await seedSvc.deleteById(req.params.id)
            if(deleted.image) {
                deleteFile("./public/uploads/seed/", deleted.image)
            }
            res.json({
                result: deleted, 
                message: "Seed Deleted successfully",
                meta: null
            })
        } catch(exception){
            next(exception)
        }
    }

    createSeedReview = async(req, res, next)=>{
        try{
            const id = req.params.id;
            const payload = req.body;
            payload.rating = Number(payload.rating);

            const alreadyReviewed = (await SeedModel.findById(id)).reviews.map(r => r.user.toString() === req.authUser._id.toString()).pop();
            if(alreadyReviewed){
                next({code: 400, message: "Seed already reviewed"});
            }
            const reviews = {
                rating: payload.rating,
                comment: payload.comment,
                user: req.authUser._id
            }

            await SeedModel.updateOne({_id: req.params.id}, {$push: {reviews: reviews}})
            let Seed = await SeedModel.findById(id);
            let  numReviews = Seed.reviews.length;
            let rating = Seed.reviews.reduce((acc, item)=> item.rating + acc , 0)/Seed.reviews.length;
            

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
        catch(except){
            next(except)
        }
    }

    listReview = async(req, res, next)=>{
        try{
            let review = await seedSvc.getReview(req.params.id);
            return review;
        }
        catch(except){
            next(except);
        }
    }


}

const seedCtrl = new SeedController()
module.exports = seedCtrl