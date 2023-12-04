const router = require('express').Router()
const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const validateRequest = require('../../middlewares/validate-request.middleware');
const { seedSchema, commentSchema, lendMachineSchema, consumerProductSchema } = require('../product/product.validator');
const productSeedCtrl = require('../product/productSeed.controller');
const uploader = require('../../middlewares/uploader.middleware');
const productLendMachineCtrl = require('./productLendMachine.controller');
const consumerProductCtrl = require('./consumerProduct.controller');

const dirSetupSeed = (req, res, next)=>{
    req.uploadDir = './public/uploads/seeds';
    next()
}
const dirSetupLM = (req, res, next)=>{
    req.uploadDir = './public/uploads/lendmachines';
    next()
}
const dirSetupConsumer = (req, res, next)=>{
    req.uploadDir = './public/uploads/consumers';
    next()
}

//for seeds
router.route('/seeds')
    .get(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), productSeedCtrl.getSeedProducts)
    .post(checkLogin, checkPermission(['admin', 'supplier']), dirSetupSeed, uploader.single('image'), validateRequest(seedSchema), productSeedCtrl.createSeedProduct);

router.route('/seeds/:id/reviews')
    .post(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), validateRequest(commentSchema), productSeedCtrl.createSeedProductReview);

router.route('/seeds/:id')
    .get(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), productSeedCtrl.getSeedProductById)
    .delete(checkLogin, checkPermission(['admin', 'supplier']), productSeedCtrl.deleteSeedProduct)
    .put(checkLogin, checkPermission(['admin', 'supplier']), dirSetupSeed, uploader.single('image'), validateRequest(seedSchema), productSeedCtrl.updateSeedProduct);

//for lendMachines
router.route('/lendMachines')
    .get(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), productLendMachineCtrl.getLendMachines)
    .post(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), dirSetupLM, uploader.single('image'), validateRequest(lendMachineSchema), productLendMachineCtrl.createLendMachine)

router.route('/lendMachines/:id/reviews')
    .post(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), validateRequest(commentSchema), productLendMachineCtrl.createLendMachineReview);

router.route('/lendMachines/:id')
    .get(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), productLendMachineCtrl.getLendMachineById)
    .delete(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), productLendMachineCtrl.deleteLendMachine)
    .put(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), dirSetupLM, uploader.single('image'), validateRequest(lendMachineSchema), productLendMachineCtrl.updateLendMachine)

//for consumer product
router.route('/consumer')
    .get(checkLogin, checkPermission(['admin', 'farmer', 'consumer']), consumerProductCtrl.getConsumerProducts)
    .post(checkLogin, checkPermission(['admin', 'farmer']), dirSetupConsumer, uploader.single('image'), validateRequest(consumerProductSchema), consumerProductCtrl.createConsumerProduct)

router.route('/consumer/:id/reviews')
    .post(checkLogin, checkPermission(['admin', 'farmer', 'consumer']), validateRequest(commentSchema), consumerProductCtrl.createConsumerProductReview);

router.route('/consumer/:id')
    .get(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), consumerProductCtrl.getConsumerProductById)
    .delete(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), consumerProductCtrl.deleteConsumerProduct)
    .put(checkLogin, checkPermission(['admin', 'supplier', 'farmer']), dirSetupConsumer, uploader.single('image'), validateRequest(consumerProductSchema), consumerProductCtrl.updateconsumerProduct)


module.exports = router;