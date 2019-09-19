// import models
const ProductsModel = require('../models/ProductsModel');

exports.getProduct = (req, res, next) => {
    ProductsModel.getFirstProduct().then((product) => {
        res.render('product', {
            product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Product'
        });
    });
}

exports.getProductById = (req, res, next) => {
    // get product id, get product, then render product page
    let id = req.params.id;
    ProductsModel.getProductById(id).then((product) => {
        res.render('product', {
            product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Product details'
        });
    });
}