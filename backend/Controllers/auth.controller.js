const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/Users");
require("dotenv").config();

const login = async(req,res)=>{
    const {username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if(!existingUser) return res.json({message: "User not found"});
        
        const isPasswordcorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordcorrect) return res.json({message:" Invalid password"});

        const token = jwt.sign({
            username: existingUser.username,
            id: existingUser._id,
        }, process.env.JWT_PASSWORD, {expiresIn: "12h"}); 

        existingUser.password = undefined;
        
        console.log("token: ", token);
        res.status(200).json({message:"Success", token, user: existingUser}); // send token to client

    } catch (error) {
        console.log("login error: ", error);
        res.status(500).json({error: "server error in login"});
    }
}

const register = async(req,res)=>{
    const {fullname, email, username, password} = req.body;
    try {
        const isexisting = await User.findOne({username});
        if(isexisting) return res.json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 12); // 12 is the difficulty level for hashing

        const newUser = await User.create({
            fullname,
            email,
            username,
            password: hashedPassword,
        });

        const token = jwt.sign({
            username: newUser.username,
            id: newUser._id,
        }, process.env.JWT_PASSWORD, {expiresIn: "12h"}); // create token
        console.log("token: ", token);

        res.status(200).json({message:"Success", token, user: newUser}); // send token to client

    } catch (error) {
        console.log("register error: ", error);
        res.status(500).json({error: "server error in register"});
    }
}

module.exports = {login, register}; // export the functions to use in other files
// export default {login, register}; // we are not using this because :The error SyntaxError: Unexpected token 'export' occurs because you are using ES6 module syntax (export default) in a Node.js environment that does not support ES6 modules by default. Node.js uses CommonJS module syntax (module.exports) unless explicitly configured to use ES6 modules.