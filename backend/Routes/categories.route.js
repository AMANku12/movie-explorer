const express = require("express");
const router = express.Router();

const GenreData = require("../Controllers/category.controller.js");

router.post("/genre", GenreData);

module.exports = router; 