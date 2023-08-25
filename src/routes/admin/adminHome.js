const express = require('express');
const router = express.Router();
const homeController = require('../../app/adminController/homeController');
const { checkTeacher, checkLogin } = require('../../app/middelware/verifyUser');

router.get('/', homeController.homeAdmin);

module.exports = router;