const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const securityController = require('../app/controllers/SecurityController');
const { checkStudent, checkTeacher, checkManager, checkLogin } = require('../app/middelware/verifyUser');


router.use(cookieParser());
router.get('/', securityController.index);
router.post('/register', securityController.create);
router.get('/account', securityController.getlogin);
/* router.post("/login", securityController.show); */
router.post('/account',  securityController.postAccount);
router.get('/private', securityController.private);

/* CÁC TRANG CÓ THỂ CHẠY KHI THÔNG QUA PHÂN QUYỀN ROLE */

router.get('/student', checkLogin, checkStudent,securityController.getStudent);
router.get('/teacher', checkLogin,checkTeacher,securityController.getTeacher);
router.get('/manager',checkLogin,checkManager, securityController.getManager);
module.exports = router;