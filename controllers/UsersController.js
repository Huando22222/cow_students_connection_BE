const User = require("../models/Users");
const Account = require("../models/Accounts");
module.exports = {
	LoginUser: async (req, res) => {
		try {
			const { phone, password } = req.body;
			console.log("user has:" + phone, password);

			const acc = await Account.findOne({
				phone: phone,
				password: password,
			});
			// const data = { acc: acc, token: "token1234567890abc" };
			if (acc !== null) {
				const user = await User.findOne({ idAcc: acc._id });
				console.log(
					acc +
						"\n" +
						user +
						"\n----------------test------------------------"
				);
				res.status(200).json({
					message: "OK",
					account: acc,
					user: user,
				});
			} else {
				res.status(500).json("Loi Dang Nhap");
			}
		} catch (error) {
			res.status(500).json("false load user");
		}
	},

	profile: async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				birthDay,
				gender,
				// avatar,
				phone,
				idAcc,
			} = req.body;
			const avatar = req.file.filename;
			console.log(
				"user profile: " + firstName,
				lastName,
				birthDay,
				gender,
				phone,
				idAcc,
			);
		// _id: { type: mongoose.Types.ObjectId, required: true },
		// firstName: { type: "string", required: true },
		// lastName: { type: "string", required: true },
		// birthDay: { type: Date, required: true },
		// gender: { type: "string", },
		// avatar: { type: "string", },
		// phone: { type: "string", },
		// // token: { type: "string", required: true },
		// idAcc: {type: "string", required: true}
			const user = new User({
				firstName,
				lastName,
				birthDay,
				gender,
				avatar: avatar,
				phone,
				idAcc,
			});
			console.log("profile filled " + user);
				await user
					.save()
					.then(() => {
						console.log("profile filled thành công " + user);
						res.status(200).json({
							message: "profile filled thành công",user:  user
						});
					})
					.catch((err) => console.log(err));
		} catch (error) {
			res.status(500).json("false load user");
		}
	},

	RegisterUser: async (req, res) => {
		try {
			const { phone, password, displayName, email, id, photoUrl }=req.body;
			console.log(phone, password, displayName, email, id, photoUrl);
			const acc = await Account.findOne({
				$or: [
					{ $and: [{ phone: phone }, { id: "" }] },
					{ $and: [{ id: id }, { id: { $ne: "" } }] },
				],
			});

			console.log(acc);
			if (acc !== null) {
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
					.then(() => {
						console.log("Đã đăng ký tài khoản thành công");
						res.status(200).json({
							message: "Đã đăng ký tài khoản thành công",
						});
					})
					.catch((err) => console.log(err));
			}
		} catch (error) {
			res.status(500).json({
				message: "Lỗi trong quá trình đăng ký tài khoản",
			});
		}
	},
};
