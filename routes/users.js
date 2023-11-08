const express = require('express');
const router = express.Router(); 

const UsersController = require('../controllers/UsersController');

router.post("/login", UsersController.LoginUser);
router.post("/register", UsersController.RegisterUser);

module.exports = router;
