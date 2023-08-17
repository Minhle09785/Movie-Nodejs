const Account = require('../models/User.js');
const jwt = require("jsonwebtoken");

module.exports = {
    checkLogin : (req, res, next) => {
        try {
            const token = req.cookies.token
            const idUser = jwt.verify(token, "mk")
            Account.findOne({
                _id: idUser
            })
           .then(data => {
            if(data) {
                req.data = data
                next()
            }else{
                res.json("that bai")
            }
           })
           } catch (error) {
            return res.json("khong tìm thấy token!")
           }
    },
    checkStudent : (req, res, next) => {
        const role = req.data.role
        if(role === 'student' || role === 'teacher' || role === 'manager') {
            next()
        }else{
            res.json("Role Khong hop le");
        }    
    },
    checkTeacher : (req, res, next) => {
        const role = req.data.role
            if(role === 'teacher' || role === 'manager') {
                next()
            }else{
                res.json("Role Khong hop le");
            }    
    },
    checkManager : (req, res, next) => {
        const role = req.data.role
        if(role === 'manager') {
            next()
        }else{
            res.json("Role Khong hop le");
        }    
    }

}