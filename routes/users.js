const express = require('express');
const router = express.Router();

// User controller needer
const userController = require('../controllers/user_controller');
const passport = require('passport');

// sign up page 
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);


// Create the new user
router.post('/create',userController.create);

// Create session for perticular user and also check the authorization
router.post('/create-session',passport.authenticate('local',{
    failureRedirect: '/users/log-in'
}),userController.createSession);

// log out
router.get('/sign-out',userController.destroySession);

// Make admin
router.post('/makeAdmin',userController.makeAdmin);

// Add employee
router.post('/addEmployee',userController.addEmployee);

// forgetPassword
router.get('/forgetPassword',userController.forgetPasswordPage);
router.post('/forgetPasswordLink',userController.forgetPasswordLink);

module.exports = router;