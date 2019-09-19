const router = require('express').Router();
const check = require('express-validator').check;
const multer = require('multer');

// import controllers
const AdminController = require('../controllers/AdminController');
const AdminGuard = require('./guards/AdminGuard');

router.get('/add', AdminGuard.isAdmin, AdminController.getAdd);

router.post('/add', 
    AdminGuard.isAdmin,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'imgs');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            }
        })
    }).single('image'),
    check('image').custom((value, {req}) => {
        if(req.file) return true;
        else throw 'You must upload an image'
    }),
    check('name')
        .not()
        .isEmpty()
        .withMessage('Product name is required'),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Product price is required')
        .isInt({min: 1})
        .withMessage('Price must be greater than 0'),
    check('description')
        .not()
        .isEmpty()
        .withMessage('You must provide a description for product'),
    check('category')
        .not()
        .isEmpty()
        .withMessage('Please, select product category'),
    AdminController.postAdd
);

module.exports = router;