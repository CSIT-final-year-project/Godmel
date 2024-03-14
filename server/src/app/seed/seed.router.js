const CheckLogin = require('../../middlewares/auth.middleware')
const checkAccess = require('../../middlewares/check-access.middleware')
const CheckPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const ValidateRequest = require('../../middlewares/validate-request.middleware')
const { SeedValidatorSchema, seedReviewSchema } = require('./seed.validator')
const seedCtrl = require('./seed.controller')
const seedSvc = require('./seed.service')
const validateRequest = require('../../middlewares/validate-request.middleware')
const router = require('express').Router()

const dirSetup = (req, res, next) => {
    req.uploadDir = './public/uploads/product'
    next()
}

router.get('/home', seedCtrl.listForHome);

router.get('/:slug/slug', seedCtrl.getBySlug);

router.route('/')
    .get(
        CheckLogin,
        CheckPermission('admin'),
        seedCtrl.listAllSeeds
    )
    .post(
        CheckLogin,
        CheckPermission('admin'),
        dirSetup,
        uploader.array('images'),
        ValidateRequest(SeedValidatorSchema),
        seedCtrl.createSeed
    )

router.route('/:id/reviews')
    .post(CheckLogin, CheckPermission('farmer'), validateRequest(seedReviewSchema), seedCtrl.createSeedReview)
    .get(seedCtrl.listReview);

router.route('/:id')
    .get(
        CheckLogin,
        CheckPermission('admin'),
        seedCtrl.getById
    )
    .put(
        CheckLogin,
        CheckPermission('admin'),
        checkAccess(seedSvc),
        dirSetup,
        uploader.array('images'),
        ValidateRequest(SeedValidatorSchema),
        seedCtrl.updateById
    )
    .delete(
        CheckLogin,
        CheckPermission('admin'),
        checkAccess(seedSvc),
        seedCtrl.deleteById
    )


module.exports = router

