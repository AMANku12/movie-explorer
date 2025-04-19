const User = require("../Models/Users");

const getWatchlist = async(req,res)=>{
    const user = req.user;
    try {
        const watchlist = await User.findById(user.id).select("watchlist"); // find user by id and select watchlist
        if(!watchlist) return res.status(404).json({message: "Watchlist not found"}); // if watchlist not found, send error
        console.log("watchlist", watchlist);
        res.status(200).json({message: "Success", watchlist: watchlist}); // send success message and watchlist
    } catch (error) {
        console.log("Error fetching watchlist", error);
        res.status(500).json({error: "server error"});
    }
}

const addToWatchlist = async(req,res)=>{
    const userId = req.user.id; // to get user id from token
    const moviedetails = req.body.moviedetails; // to get movie id from request body
    console.log("movieId", moviedetails.id);
    console.log("userId", userId);

    try {
        const user = await User.findById(userId); // find user by id
        if(!user) return res.status(404).json({message: "User not found"}); // if user not found, send error
        if(!user.watchlist.some(movie => movie.id === moviedetails.id)) { // check if movie is already in watchlist
            user.watchlist.push(moviedetails); // add movie id to watchlist
            await user.save(); // save user
        }
        res.status(200).json({message: "Success", updateduser: user}); // send success message and watchlist
    } catch (error) {
        console.log("Error adding to watchlist", error);
        res.status(500).json({error: "server error"});
    }
}

const removeFromWatchlist = async(req,res)=>{
    const movieId = req.body.movieId;
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"});
        
        user.watchlist = user.watchlist.filter(movie => movie.id !==movieId);
        await user.save();
        res.status(200).json({message:"Success", updateduser: user});
        
    } catch (error) {
        console.log("error in removing from watchlist", error);
        res.status(500).json({error: "Server error"});
    }

}

module.exports = {addToWatchlist,removeFromWatchlist, getWatchlist}; // export the function to use in other files