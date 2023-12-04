const asynchandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const UserModel = require('./user.model');
const { deleteFile } = require('../../config/helpers');

class UserController {
    createAdmin = asynchandler(async (req, res, next) => {
        let payload = req.body;
        payload.role = 'admin';
        if (!req.file) {
            next({ code: 401, message: "Image Required" });
        }
        else {
            payload.image = req.file.filename;
            payload.password = bcrypt.hashSync(payload.password, 10);
            payload.status = 'active';

            let admin = new UserModel(payload);
            let response = await admin.save();

            res.json({
                result: response,
                message: "Admin Created",
                meta: {
                    totalAdmin: await UserModel.countDocuments({ role: "admin" })
            }
        })
        }
    })

    getMyProfile = asynchandler(async (req, res, next) => {
        let profile = await UserModel.findOne({ _id: req.authUser._id });
        if (!profile) {
            next({ code: 400, message: "User may not logged in or doesn't exist" });
        }
        else {
            res.json({
                result: profile,
                message: "User profile fetched",
                meta: null
            })
        }
    })

    updateMyProfile = asynchandler(async (req, res, next) => {
        let profile = await UserModel.findOne({ _id: req.authUser._id });

        if (!profile || profile.status !== 'active') {
            next({ code: 400, message: "User may not logged in or doesn't exist or is not activated" });
        }
        else {
            let payload = req.body;
            if (req.file) 
                payload.image = req.file.filename;
            

            let response = await UserModel.findByIdAndUpdate(profile._id, payload);

            if(response){
                deleteFile('/public/uploads/users/', payload.image);
            }

            res.json({
                result: response,
                message: "Profile updated",
                meta: null
            })
        }
    })

    changePassword = asynchandler(async(req, res, next)=>{
        let data = req.body;
        if(bcrypt.compareSync(data.oldPassword, req.authUser.password)){
            const newPassword = bcrypt.hashSync(data.newPassword, 10);
            let response = await UserModel.findByIdAndUpdate(req.authUser._id, {password: newPassword});

            res.json({
                result: response,
                message: "Password Change Successfully",
                meta: null
            })
        }
        else{
            next({code: 401, message: "Old Password doesn't match"});
        }
    })

    getAllUsers = asynchandler(async(req, res, next)=>{
        let page = req.query['page'] || 1;
        let limit = req.query['limit'] || 15;
        let skip = (page-1)*limit;
        let users = await UserModel.find().skip(skip).limit(limit).sort({_id: 'desc'});
        res.json({
            result: users,
            message: "All users fetched",
            meta: {
                totalUsers: await UserModel.countDocuments()
            }
        })
    })

    getUser = asynchandler(async(req, res, next)=>{
        let user = await UserModel.findOne({_id: req.params.id});
        if(user){
            res.json({
                result: user,
                message: "User fetched",
                meta: null
            })
        }
        else{
            next({code: 404, message: "User not found"});
        }
    })

    deleteUser = asynchandler(async(req, res, next)=>{
        let user = await UserModel.findOne({_id: req.params.id});
        if(user){
            let deleted = await UserModel.findByIdAndDelete(req.params.id);
            res.json({
                result: deleted,
                message: "User deleted",
                meta: null
            })
        }
        else{
            next({code: 404, message: "User not found"});
        }
        
    })

    updateUser = asynchandler(async(req, res, next)=>{
        let user = await UserModel.findOne({_id: req.params.id});
        if(user){
            let updateData = {
                ...req.body
            }
            if(req.file){
                updateData.image = req.file.filename;
            }
            let updated = await UserModel.findByIdAndUpdate(req.params.id, updateData);
            res.json({
                result: updated,
                message: "User deleted",
                meta: null
            })
        }
        else{
            next({code: 404, message: "User not found"});
        }
        
    })
}

const userCtlr = new UserController();

module.exports = userCtlr;