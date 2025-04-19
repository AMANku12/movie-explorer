require("dotenv").config();

const API_KEY = process.env.API_KEY;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const GenreData = async(req,res)=>{
    try {
        const url = req.body.url;
        // console.log("actionmovies url: ", url);
        const response  = await fetch(url, options);
        const data = await response.json();
        
        if (!data.results) {
            console.log("No results found in actionmovies data");
            return res.status(500).json({ error: "No results found" });
        }

        console.log("actionmovies data: ", data);
        res.json(data.results);
    } catch (error) {
        console.log("actionmovies error: ", error);
        
    }
}

module.exports = GenreData; // export the router to use in other files