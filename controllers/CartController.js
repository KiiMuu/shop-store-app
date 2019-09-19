const CartModel = require('../models/CartModel');
const validationResult = require('express-validator').validationResult;

exports.getCart = (req, res, next) => {
    CartModel.getItemsByUser(req.session.userId).then(items => {
        res.render('cart', {
            items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Cart'
        });
    }).catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        CartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart');
        }).catch(err => {
            console.log(err);
        });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect(req.body.redirectTo);
    }
}

exports.saveCart = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        CartModel.editItem(req.body.cartId, {
            amount: req.body.amount,
            timestamp: Date.now()
        }).then(() => res.redirect('/cart')).catch(err => console.log(err));
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/cart');
    }
}

exports.deleteCart = (req, res, next) => {
    CartModel.deleteItem(req.body.cartId).then(() => {
        res.redirect('/cart')
    }).catch(err => console.log(err));
}