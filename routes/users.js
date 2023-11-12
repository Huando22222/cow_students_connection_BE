const express = require('express');
const router = express.Router(); 
const UsersController = require('../controllers/UsersController');
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// return cb(null, "../public/images");
		return cb(null, path.join(__dirname, "../public/images"));
	},
	filename: function (req, file, cb) {
		return cb(null, `${Date.now()}_${file.originalname}`);
	},
});

const upload = multer({ storage });
router.post("/login", UsersController.LoginUser);
router.post("/profile", upload.single("avatar"), UsersController.profile);
router.post("/register", UsersController.RegisterUser);

module.exports = router;
