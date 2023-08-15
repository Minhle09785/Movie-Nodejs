const error = require('mongoose/lib/error');
const Account = require('../models/Login.js');
const { sendSuccess, sendError, sendServerError } = require('../middelware/index.js');
const jwt = require("jsonwebtoken");
class SecurityController {

    /*
        GET : /login
        Get đến Trang Tạo tài khoản
    */
    index(req, res) {
        res.render('login/createAccount');
    }
     /*
        GET : /login/account
        Get đến Trang Tạo tài khoản
    */
    getlogin(req, res) {
        res.render("login/logins");
    }
    

    /*
        POST : /login/register
        Tạo dữ liệu tài khoản mới.
    */ 
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
    /* show(req, res) {
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
    } */

    //Get Account
  /*    async getAccount(req, res) {
      try {
        const {name, password, role} = req.query;
        var query = {};
        if(name) {
            query.name = name;
        }
        const account = await Account.find({$and: [query]})
        const length = await Account.find({$and: [query]}).count();
        if(account){ 
            return sendSuccess(res, "sendSuccess", {
                length,
                account
            })
        }else{
            return sendError(res, "Fail")
        }
      } catch (error) {
        console.log(error);
        return sendServerError();
      }

      
    }
    */
    /* 
        POST : /login/account
    */
    postAccount(req, res, next) {
        const {name, password} = req.body
        Account.findOne({
            name: name,
            password: password
        }).then(data => {
           if(data){
            var token = jwt.sign({
                _id: data._id
            }, 'mk')
            res.json({
                message: 'thanh cong',
                token: token
            })
        }else{
            return sendError(res, "that bai", );
           }
        }).catch(error => {
            return res.status(400)
        })
    }
    /*
        GÁN MÃ TOKEN LÊN ĐƯỜNG DẪN ĐỂ CHẠY.
        GET: /login/private
    */ 
    private(req, res, next) {
          {
           try {
            const token = req.cookies.token;
            const ketqua = jwt.verify(token, "mk");
            if(ketqua) {
                next()
            }
           } catch (error) {
            return res.redirect("/login/account")
           }
        };{
            return res.redirect("/")
        }
    }
}

module.exports = new SecurityController();