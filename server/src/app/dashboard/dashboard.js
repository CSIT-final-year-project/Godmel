const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const BannerModel = require('../banner/banner.model');
const CartModel = require('../cart/cart.model');
const ProductModel = require('../product/product.model');
const SeedModel = require('../seed/seed.model');
const UserModel = require('../user/user.model');

const router = require('express').Router();

router.get('/admin-dashboard', checkLogin, checkPermission(['admin', 'farmer']), async (req, res, next)=>{
    const banner = await BannerModel.countDocuments({createdBy: req.authUser._id});
    const product = await ProductModel.countDocuments({createdBy: req.authUser._id});
    const seed = await SeedModel.countDocuments({createdBy: req.authUser._id});
    const user = await UserModel.countDocuments();
    const pendingOrder = await CartModel.countDocuments({status: "new", seller: req.authUser._id});
    const completedOrder = await CartModel.countDocuments({status: "dispatched", seller: req.authUser._id});

    res.json({
        result: {
            user: user,
            banner: banner,
            product: product,
            seed: seed,
            pendingOrder: pendingOrder,
            completedOrder: completedOrder
        }
    })
})

router.get('/farmer-dashboard', checkLogin, checkPermission(['admin', 'farmer']), async (req, res, next)=>{
    const product = await ProductModel.countDocuments({createdBy: req.authUser._id});
    const pendingOrder = await CartModel.countDocuments({$and: [
        {seller: req.authUser._id},
        {status: "new"}
    ]});
    const completedOrder = await CartModel.countDocuments({$and: [
        {seller: req.authUser._id},
        {status: "dispatched"}
    ]});

    res.json({
        result: {
            product: product,
            pendingOrder: pendingOrder,
            completedOrder: completedOrder
        }
    })
})

module.exports = router