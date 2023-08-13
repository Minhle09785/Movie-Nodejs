const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Login = new Schema( 
    {
    name : {type: String, require: true},
    password : {type: String, require: true},
    role: {type: String, require: true}
},
{
    timestamps: true,
},);
module.exports = mongoose.model('Login', Login);
