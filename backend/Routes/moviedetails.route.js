const express = require('express');
const router = express.Router();
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const movieDetailsController = async(req,res)=>{
    try {
        const url = req.body.url;
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("moviedetails data: ", data);
        res.json(data);
    } catch (error) {
        console.log("moviedetails error: ", error);
    }
}

router.post("/moviedetails", movieDetailsController);


module.exports = router;