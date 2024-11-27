const express = require('express');
const router = express.Router();

//get controller
const homeController = require('../app/controllers/homeController');

//set routes
router.get('/', homeController.index);

module.exports = router;