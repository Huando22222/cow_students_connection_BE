const express = require("express");
const router = express.Router();
const PostsLocationController = require("../controllers/PostsLocationController");


router.get("/", PostsLocationController.GetPostLocation);
router.get("/new", PostsLocationController.NewPostLocation);


module.exports = router;
