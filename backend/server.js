const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const AuthRouter = require("./Routes/auth.route.js");
const NewMoviesRouter = require("./Routes/newmovies.route.js");
const MovieDetailsRouter = require("./Routes/moviedetails.route.js");
const CategoriesRouter = require("./Routes/categories.route.js");
const WatchlistRouter = require("./Routes/watchlist.route.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("backend server is running");
})

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err)
});

// authentication route
app.use("/api/auth", AuthRouter);

// new movies route
app.use("/api/homepage", NewMoviesRouter); 

// movie details
app.use("/api/detail", MovieDetailsRouter);

// movie genres
app.use("/api/category", CategoriesRouter);

// your watchlist
app.use("/api/watchlist", WatchlistRouter); 

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port 3000");
})