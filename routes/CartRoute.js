const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const AuthGuard = require('./guards/AuthGuard');

// import controllers
const CartController = require('../controllers/CartController');

router.get('/', AuthGuard.isAuth, CartController.getCart);

router.post('/',
    AuthGuard.isAuth, 
    bodyParser.urlencoded({extended: true}), 
    check('amount')
        .not()
        .isEmpty()
        .withMessage('Amount is required')
        .isInt({min: 1})
        .withMessage('Amount must be greater than 0'),
    CartController.postCart
);

router.post('/save', 
    AuthGuard.isAuth, 
    bodyParser.urlencoded({extended: true}),
    check('amount')
        .not()
        .isEmpty()
        .withMessage('Amount is required')
        .isInt({min: 1})
        .withMessage('Amount must be greater than 0'),
    CartController.saveCart
);

router.post('/delete', 
    AuthGuard.isAuth, 
    bodyParser.urlencoded({extended: true}),
    CartController.deleteCart
);

module.exports = router;