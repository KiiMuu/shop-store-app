const router = require('express').Router();

// import controllers
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.getHome);

module.exports = router;