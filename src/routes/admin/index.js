const adminHome = require('./adminHome');
const express = require('express')
const adminRouter = express.Router()

adminRouter.use('/home', adminHome)

module.exports = adminRouter;

   

