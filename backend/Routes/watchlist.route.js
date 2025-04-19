const express = require("express");
const router = express.Router();
const watchlistController = require("../Controllers/watchlist.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

router.post("/addtowatchlist", authMiddleware,watchlistController.addToWatchlist);

router.post("/removefromwatchlist", authMiddleware ,watchlistController.removeFromWatchlist);

router.get("/getwatchlist", authMiddleware, watchlistController.getWatchlist);

module.exports = router;