const express = require("express");
const PostLocationController = require("../controllers/PostLocationController");
const router = express.Router();




router.post("/new", PostLocationController.NewPostLocation);
router.get("/", PostLocationController.GetPostLocations);

module.exports = router;
