const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// configure environment
dotenv.config();

const app = express();

// connect to mongo db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
    console.log('Conncted to mongodb');
}).catch(err => {
    console.log(err);
});

// import routes
const HomeRoute = require('./routes/HomeRoute');
const ProductRoute = require('./routes/ProductRoute');
const AuthRoute = require('./routes/AuthRoute');
const CartRoute = require('./routes/CartRoute');
const AdminRoute = require('./routes/AdminRoute');

// const app = express();

// use static file from assets - HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'imgs')));
app.use(flash());

// use session
const STORE = new SessionStore({
    uri: process.env.DB_URL,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    store: STORE,
    resave: true
    // cookie: {
    //     maxAge: 1*60*60*100 // one hour
    // }
}));

app.set('view engine', 'ejs');
app.set('views', 'views'); // default value


// use routes
app.use('/', HomeRoute);
app.use('/', AuthRoute);
app.use('/product', ProductRoute);
app.use('/cart', CartRoute);
app.use('/admin', AdminRoute);

app.get('/error', (req, res, next) => {
    res.status(500);
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Something went wrong'
    });
});

app.get('/notAdmin', (req, res, next) => {
    res.status(403);
    res.render('notAdmin', {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: 'Admins area only'
    });
});

app.use((err, req, res, next) => {
    res.redirect('/error');
});

// not found page
app.use((req, res, next) => {
    res.status(404);
    res.render('notFound', {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: 'Page not found'
    });
});

// run application
PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${PORT}`);
});