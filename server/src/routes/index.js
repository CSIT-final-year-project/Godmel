//imports
const router = require('express').Router();
const authRouter = require('../app/auth/auth.router');
const bannerRouter = require('../app/banner/banner.router')
const seedRouter = require('../app/seed/seed.router')
const productRouter = require('../app/product/product.router')
const userRouter = require('../app/user/user.router');

//api
router.use('/auth', authRouter);
router.use('/banner', bannerRouter);
router.use('/seed', seedRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);


//exports
module.exports = router;