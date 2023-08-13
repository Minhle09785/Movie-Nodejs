const express = require('express');
const router = express.Router();

const securityController = require('../app/controllers/SecurityController');

router.get('/', securityController.index);
router.post('/register', securityController.create);
router.get('/login', securityController.getlogin);
router.post("/login", securityController.show);
module.exports = router;