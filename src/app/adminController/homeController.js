const User = require('../models/User');
const { sendSuccess, sendError, sendServerError } = require('../middelware/error');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class homeController {

    /* Method: GET
        API: /api/admin/home
    */
    async homeAdmin(req, res, next) {
       try {
        const {name, password, role} = req.query;
        var query = {};
        if(name) {
            query.name = name;
        }if(password) {
            query.password = password;
        }if(role) {
            query.role = role;
        }
        const user = await User.find({$and: [query]})
        if(user) {
            res.render('admin/home', {
                users: mutipleMongooseToObject(user)});
        }else{
            return sendError(res, "Find Fail!")
        }
       } catch (error) {
            return sendServerError(error)
       }
    }
}

module.exports = new homeController();