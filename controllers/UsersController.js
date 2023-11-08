const Users = require('../models/Users');

module.exports = {

    LoginUser: async (req, res) => { 
        try {
			// const { username, password } = req.body;
			const { phone, password } = req.body;
			console.log("user has:" + phone, password);

			// const user = await Users.find().sort({ createdAt: -1 });    //send array object
			// const userId = "65475c7b622dee003c7d60f0";         
			// const user = await Users.findOne({ _id: userId });          //only 1 user
			console.log(
				 "----------------test--------------------------"
			);
			// const data = { user: user, token: "token1234567890abc" };

			// res.status(200).json({ message: "OK", data: user });
			res.status(200).json({ message: "OK"});

			// const { username, password } = req.body;
			// console.log("username:  "+username);
			// if (username === "123" && password === "123") {
			//     const User = await Product.find().sort({ createdAt: -1 });
			// 	res.status(200).json(User);
			// } else {
			//     res.status(500).json("incorre"${AppConfig.baseUrl}""${AppConfig.baseUrl}"ct username or password");
			// }
		} catch (error) {
            // res.status(500).json("false load user");
        }
    },
}