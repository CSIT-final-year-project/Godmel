const checkAccess = (svc)=>{
    return async (req, res, next)=>{
        try{
            let id = req.params.id;
            console.log(id)
            let data = await svc.getCategoryByFilter({_id: id})
            if(!data){
                throw {code: 404, message: "contain doesn't exist" };
            }
            else if(!data.createdBy._id.equals(req.authUser._id)){
                throw { code: 403, message: "Content doesn't belongs to you"}
            }
            else{
                req.content = data;
                next();
            }
        }
        catch(except){
            next(except);
        }
    }
}

module.exports = checkAccess