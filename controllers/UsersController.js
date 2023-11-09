const Users = require('../models/Users');
const Account = require('../models/Accounts');
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

	RegisterUser: async (req, res) => {
		try {
		  const {
				phone,
				password,
				displayName,
				email,
				id,
				photoUrl,
			} = req.body;
	  
			// Tạo một tài khoản mới
			console.log(
				phone,
				password,
				displayName,
				email,
				id,
				photoUrl,
			);
			const user = await Account.findOne({
				$or: [
					{ $and: [{ phone: phone }, { id: { $exists: false } }] },
					{ id: { $exists: true } },
				],
			});
			console.log(user);
			if (user !== null) {
				//return acc already exists
				console.log("acc already exists!");
				res.status(500).json({
					message: "acc already exists",
				});
			} else {
				const account = new Account({
					phone,
					password,
					displayName,
					email,
					id,
					photoUrl,
					// serverAuthCode: "",
				});
				
				// Lưu tài khoản vào cơ sở dữ liệu
				await account
					.save()
					.then(()=> {
						console.log("Đã đăng ký tài khoản thành công");
						res.status(200).json({
							message: "Đã đăng ký tài khoản thành công",
						});
					})
					.catch((err) => console.log(err));
			}
			// if (phone !== null && password !== null) {
			// 	const user = await Account.findOne({ phone: phone });
			// 	if (user !== null) {
			// 		//return acc already exists
			// 		console.log("acc already exists!" );
			// 		res.status(500).json({
			// 			message: "acc already exists",
			// 		});
			// 	} else {
			// 		const account = new Account({
			// 			phone,
			// 			password,
			// 			displayName: "",
			// 			email: "",
			// 			id: "",
			// 			photoUrl: "",
			// 			// serverAuthCode: "",
			// 		});

			// 		// Lưu tài khoản vào cơ sở dữ liệu
			// 		await account
			// 			.save()
			// 			.then(() =>
			// 				console.log("Đã đăng ký tài khoản thành công")
			// 			)
			// 			.catch((err) => console.log(err));
			// 	}
			// } else {
			// 	const user = await Account.findOne({ id: id });
			// 	if (user !== null) {
			// 		//return acc already exists
			// 		console.log("acc already exists!");
			// 		res.status(500).json({
			// 			message: "acc already exists",
			// 		});
			// 	} else {
			// 		const account = new Account({
			// 			phone: "",
			// 			password: "",
			// 			displayName,
			// 			email,
			// 			id,
			// 			photoUrl,
			// 			// serverAuthCode,
			// 		});

			// 		// Lưu tài khoản vào cơ sở dữ liệu
			// 		await account
			// 			.save()
			// 			.then(() =>
			// 				console.log("Đã đăng ký tài khoản thành công")
			// 			)
			// 			.catch((err) => console.log(err));
			// 	}
			// }
	  
		  
		} catch (error) {
		  res.status(500).json({ message: "Lỗi trong quá trình đăng ký tài khoản" });
		}
	  }
	  
	  
	  
	  
}