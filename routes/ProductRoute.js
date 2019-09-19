const router = require('express').Router();

// import controllers
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getProduct);

router.get('/:id', ProductController.getProductById);

module.exports = router;