const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    watchlist:{
        type:Array,
        default: [],
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;