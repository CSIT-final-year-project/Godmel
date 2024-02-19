const CheckLogin = require('../../middlewares/auth.middleware')
const checkAccess = require('../../middlewares/check-access.middleware')
const CheckPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const ValidateRequest = require('../../middlewares/validate-request.middleware')
const { ProductValidatorSchema } = require('./product.validator')
const productCtrl = require('./product.controller')
const productSvc = require('./product.service')
const router = require('express').Router()

const dirSetup = (req, res, next) => {
    req.uploadDir = './public/uploads/product'
    next()
}

router.get('/home', productCtrl.listForHome);

router.get('/:slug/slug', productCtrl.getBySlug);

router.route('/')
    .get(
        CheckLogin,
        CheckPermission('farmer'),
        productCtrl.listAllProducts
    )
    .post(
        CheckLogin,
        CheckPermission('farmer'),
        dirSetup,
        uploader.array('images'),
        ValidateRequest(ProductValidatorSchema),
        productCtrl.createProduct
    )

router.route('/:id/reviews')
    .post(CheckLogin, CheckPermission('customer'), productCtrl.createProductReview)
    .get(productCtrl.listReview);

router.route('/:id')
    .get(
        CheckLogin,
        CheckPermission('farmer'),
        productCtrl.getById
    )
    .put(
        CheckLogin,
        CheckPermission('farmer'),
        checkAccess(productSvc),
        dirSetup,
        uploader.array('images'),
        ValidateRequest(ProductValidatorSchema),
        productCtrl.updateById
    )
    .delete(
        CheckLogin,
        CheckPermission('farmer'),
        checkAccess(productSvc),
        productCtrl.deleteById
    )


module.exports = router

