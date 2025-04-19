const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req,res,next)=>{
    try {
        const token = req.headers.authorization?.replace("Bearer ","");
        if(!token) {
            console.log("No token provided");
            return res.status(401).json({message: "No token provided"}); // if no token, send error
        }
        const decoded = jwt.verify(token, "test"); // verify token
        console.log("decoded token", decoded);
        req.user = decoded;
        next(); // call next middleware

    } catch (error) {
        console.log("Error in auth middleware", error);
        res.status(401).json({message: "Invalid token"}); // if token is invalid, send error
    }
}

module.exports = authMiddleware; // export the middleware to use in other files