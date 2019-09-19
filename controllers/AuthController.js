const AuthModel = require('../models/AuthModel');
const validationResult = require('express-validator').validationResult;

exports.getSignUp = (req, res, next) => {
    res.render('signup', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Sign Up'
    });
}

exports.postSignUp = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        AuthModel.createNewUser(
            req.body.username,
            req.body.email,
            req.body.password
        ).then(() => {
            res.redirect('/login');
        }).catch(err => {
            console.log(err);
            res.redirect('/signup');
        });
    } else {
        req.flash('validationErrors' ,validationResult(req).array());
        res.redirect('/signup');
    }
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Sign In'
    });
}

exports.postLogin = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        AuthModel.login(
            req.body.email,
            req.body.password
        ).then(result => {
            req.session.userId = result.id;
            req.session.isAdmin = result.isAdmin;
            res.redirect('/');
        }).catch(err => {
            req.flash('authError', err);
            res.redirect('/login');
        });
    } else {
        req.flash('validationErrors' ,validationResult(req).array());
        res.redirect('/login');
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}