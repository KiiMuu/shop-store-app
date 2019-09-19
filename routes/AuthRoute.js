const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const AuthGuard = require('./guards/AuthGuard');

// import controllers
const AuthController = require('../controllers/AuthController');

router.get('/signup', AuthGuard.notAuth, AuthController.getSignUp);

router.post(
    '/signup',
    AuthGuard.notAuth,
    bodyParser.urlencoded({extended: true}),
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters'),
    check('confirmPassword').custom((value, {req}) => {
        if(value === req.body.password) return true
        else throw 'Password not match'
    }),
    AuthController.postSignUp
);

router.get('/login', AuthGuard.notAuth, AuthController.getLogin);

router.post(
    '/login', 
    AuthGuard.notAuth,
    bodyParser.urlencoded({extended: true}),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required'),
    AuthController.postLogin
);

router.all('/logout', AuthGuard.isAuth, AuthController.logout);

module.exports = router;