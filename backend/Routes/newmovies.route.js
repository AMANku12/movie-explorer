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

router.get("/newmovies", async(req,res)=>{
    try {
        const urls = [
            `${newmoviesurl}&page=1`,
            `${newmoviesurl}&page=2`,
            `${newmoviesurl}&page=3`,
            `${newmoviesurl}&page=4`,
        ];

        const responses = await Promise.all(urls.map(url => fetch(url, options))); 
        
        const data = await Promise.all(responses.map(response => response.json())); 
        const newmovies  = data.flatMap(page => page.results); 
        res.json(newmovies);

    } catch (error) {
        console.log("newmovies error: ", error);
        res.status(500).json({error: "Failed to fetch new movies"});
    }
})

module.exports = router; 

