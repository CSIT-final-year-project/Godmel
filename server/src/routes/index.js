//imports
const router = require('express').Router();
const authRouter = require('../app/auth/auth.router');
const bannerRouter = require('../app/banner/banner.router')
const categoryRouter = require('../app/category/category.router')
const productRouter = require('../app/product/product.router')

//api
router.use('/auth', authRouter);
router.use('/banner', bannerRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);


//exports
module.exports = router;