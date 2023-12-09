const checkLogin = require('../../middlewares/auth.middleware');

const router = require('express').Router();

router.route('/')
    .post(checkLogin, orderCtrl.addOrderItems);