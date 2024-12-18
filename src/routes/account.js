const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/authenticateToken');
const localsAccount = require('../config/localsAccount');
//get controller
const accountController = require('../app/controllers/accountController');

//set routes
router.post('/login/post', accountController.loginPost);
router.post('/register/post', accountController.registerPost);
router.get('/register', accountController.renderRegister);
router.use(authenticateToken);
router.use(localsAccount);
router.get('/login', accountController.renderLogin);
router.get('/logout', accountController.logout);


module.exports = router;