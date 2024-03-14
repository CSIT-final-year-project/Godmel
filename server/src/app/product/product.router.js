const CheckLogin = require('../../middlewares/auth.middleware')
const checkAccess = require('../../middlewares/check-access.middleware')
const CheckPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const ValidateRequest = require('../../middlewares/validate-request.middleware')
const { ProductValidatorSchema, productReviewSchema } = require('./product.validator')
const productCtrl = require('./product.controller')
const productSvc = require('./product.service')
const validateRequest = require('../../middlewares/validate-request.middleware')
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
        CheckPermission(['farmer', 'admin']),
        productCtrl.listAllProducts
    )
    .post(
        CheckLogin,
        CheckPermission(['farmer', 'admin']),
        dirSetup,
        uploader.array('images'),
        ValidateRequest(ProductValidatorSchema),
        productCtrl.createProduct
    )

router.route('/:id/reviews')
    .post(CheckLogin, CheckPermission('customer'), validateRequest(productReviewSchema), productCtrl.createProductReview)
    .get(productCtrl.listReview);

router.route('/:id')
    .get(
        CheckLogin,
        CheckPermission(['farmer', 'admin']),
        productCtrl.getById
    )
    .put(
        CheckLogin,
        CheckPermission(['farmer', 'admin']),
        checkAccess(productSvc),
        dirSetup,
        uploader.array('images'),
        ValidateRequest(ProductValidatorSchema),
        productCtrl.updateById
    )
    .delete(
        CheckLogin,
        CheckPermission(['farmer', 'admin']),
        checkAccess(productSvc),
        productCtrl.deleteById
    )


module.exports = router

