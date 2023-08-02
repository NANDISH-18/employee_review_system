const express = require('express');
const router = express.Router(); //router
const homeController = require('../controllers/home_controller');
console.log('router is loaded');

router.get('/',homeController.home);

// users
router.use('/users',require('./users'));
// admin
router.use('/admin',require('./admin'));
// review
router.use('/reviews',require('./reviews'))


module.exports = router;