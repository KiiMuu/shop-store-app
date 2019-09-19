// import Models
const ProductsModel = require('../models/ProductsModel');

exports.getHome = (req, res, next) => {
    // get products, then render index.ejs
    // get category with filter
    let category = req.query.category;
    let validCats = ['clothes', 'phones', 'computers'];
    let productPromise;
    if(category && validCats.includes(category))
        productPromise = ProductsModel.getProductsByCategory(category);
    else productPromise = ProductsModel.getAllProducts();
    productPromise.then(products => {
        res.render('index', {
            products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationErrors: req.flash("validationErrors")[0],
            pageTitle: 'Home'
        });
    });
}