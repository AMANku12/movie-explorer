const express =  require("express");
const router = express.Router();
require("dotenv").config();

const newmoviesurl = process.env.NEW_MOVIES_URL;

const API_KEY = process.env.API_KEY;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

router.get("/newmovies/:pageno", async(req,res)=>{
    try {
        const pageno = req.params.pageno;

        const response = await fetch(`${newmoviesurl}&page=${pageno}`,options);
        const newmovies = await response.json();
        console.log(newmovies);
        res.json(newmovies.results);

    } catch (error) {
        console.log("newmovies error: ", error);
        res.status(500).json({error: "Failed to fetch new movies"});
    }
})

module.exports = router; 

