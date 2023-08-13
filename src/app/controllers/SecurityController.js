const error = require('mongoose/lib/error');
const { mongooseToObject } = require('../../util/mongoose');

const Account = require('../models/Login.js');

class SecurityController {
    // Get đến Trang Tạo tài khoản
    index(req, res) {
        res.render('login/createAccount');
    }
    //Get đến trang đăng nhập
    getlogin(req, res) {
        res.render('login/logins');
    }

    //Tạo dữ liệu tài khoản mới.
    create(req, res){
        const {name, password, role} = req.body;
   
    Account.findOne({
        name : name,
        password : password,
        role: role
    })
    .then(data =>
      {
        if(data){
            console.log("TÀI KHOẢN NÀY ĐÃ TỒN TẠI")
            res.redirect('/login')
        }else{
            Account.create({
                name : name,
                password : password,
                role: role
            });
            Account.findOne({
                name: name,
                password: password,
                role: role
            }).then(data => {
            console.log("TẠO TÀI KHOẢN THÀNH CÔNG");
            res.redirect('/login/login')
    })
        }
      }
    ).catch(err => {
        console.log(err);
    })
    }
    show(req, res) {
        const {name, password} = req.body;

        Account.findOne({
            name: name,
            password: password
        }).then(data => {
            if(data) {
                console.log("ĐĂNG NHẬP THÀNH CÔNG");
                res.redirect("/");
            }else{
                console.log("ĐĂNG NHẬP THẤT BẠI");
                res.redirect("/login/login");
            }
        }).catch(error => {
            console.log(error);
        })
    }
}
  

module.exports = new SecurityController();