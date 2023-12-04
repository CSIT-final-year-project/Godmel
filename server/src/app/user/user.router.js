const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const validateRequest = require('../../middlewares/validate-request.middleware');
const { createAdminSchema, updateProfileSchema, changePasswordSchema } = require('../user/user.validator');
const userCtrl = require('../user/user.controller');

const router = require('express').Router();

//dirSetup
const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users';
    next();
}

//create admin account
router.route('/createAdmin')
    .post(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(createAdminSchema), userCtrl.createAdmin);

// profile
router.route('/')
    .get(checkLogin, userCtrl.getMyProfile)
    .put(checkLogin, dirSetup, uploader.single('image'), validateRequest(updateProfileSchema),  userCtrl.updateMyProfile)

//change password
router.route('/change-password')
    .put(checkLogin, validateRequest(changePasswordSchema), userCtrl.changePassword);

//admin control
//SEE ALL USERS
router.route('/users')
    .get(checkLogin, checkPermission('admin'), userCtrl.getAllUsers);

//USER SPECIFIC ACTIONS
router.route('/users/:id')
    .get(checkLogin, checkPermission('admin'), userCtrl.getUser)
    .delete(checkLogin, checkPermission('admin'), userCtrl.deleteUser)
    .put(checkLogin, checkPermission('admin'), dirSetup, uploader.single('image'), validateRequest(updateProfileSchema),  userCtrl.updateUser)

module.exports = router;