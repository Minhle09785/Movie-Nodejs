const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const securityController = require('../app/controllers/SecurityController');

router.use(cookieParser());
router.get('/', securityController.index);
router.post('/register', securityController.create);
router.get('/account', securityController.getlogin);
/* router.post("/login", securityController.show); */
router.post('/account',  securityController.postAccount);
router.get('/private', securityController.private)
module.exports = router;