const express = require('express')

const router = express.Router();
const passport = require('passport');

const adminCotroller = require('../controllers/admin_controller');

// View employee
router.get('/view-employee',passport.checkAuthentication, adminCotroller.showEmployeeList);

// Add employee
router.get('/add-employee' , passport.checkAuthentication,adminCotroller.addEmployee);

// Assign work
router.get('/assignWork',passport.checkAuthentication, adminCotroller.assignWork);

// Make new admin
router.post('/newAdmin',passport.checkAuthentication, adminCotroller.newAdmin);

// Set the reviews
router.post('/setReviewes',passport.checkAuthentication, adminCotroller.setReviewAndReviewer)

// Delete user
router.get('/deleteEmployee/:id',passport.checkAuthentication, adminCotroller.deleteEmployee);

module.exports = router;
