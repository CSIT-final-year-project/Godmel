const router = require('express').Router()
const categoryCtrl = require('../category/category.controller');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const {categoryRequestSchema} = require('../category/category.validator');
const categorySvc = require('./category.service');
const checkAccess = require('../../middlewares/check-access.middleware')

const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/category'
    next()
}

router.get('/slug/:slug', categoryCtrl.getDetailBySlug)
router.get('/home', categoryCtrl.listCategorysForHome);
router.route('/')
.get(checkLogin, checkPermission('admin'), categoryCtrl.listAllCategorys)
.post(checkLogin, 
    checkPermission('admin'), 
    dirSetup,
    uploader.single('image'),
    ValidateRequest(categoryRequestSchema),
    categoryCtrl.categoryCreate);

router.route('/:id')
.get(checkLogin, checkPermission('admin'), categoryCtrl.getDataById)
.put(checkLogin, checkPermission('admin'), checkAccess(categorySvc), dirSetup, uploader.single('image'), ValidateRequest(categoryRequestSchema), categoryCtrl.updateById)
.delete(checkLogin, checkPermission('admin'), checkAccess(categorySvc), categoryCtrl.deleteById);

module.exports = router;