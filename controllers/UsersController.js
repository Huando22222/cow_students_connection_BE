const Users = require("../models/Users");
const Account = require("../models/Accounts");
module.exports = {
	LoginUser: async (req, res) => {
		try {
			const { phone, password } = req.body;
			console.log("user has:" + phone, password);

			const user = await Account.findOne({
				phone: phone,
				password: password,
			});
			console.log(user + "----------------test------------------------");
			// const data = { user: user, token: "token1234567890abc" };
			if (user !== null) {
				res.status(200).json({ message: "OK", data: user });
			} else {
				res.status(500).json("Loi Dang Nhap");
			}
		} catch (error) {
			res.status(500).json("false load user");
		}
	},

	RegisterUser: async (req, res) => {
		try {
			const { phone, password, displayName, email, id, photoUrl } =
				req.body;

			// Tạo một tài khoản mới
			console.log(phone, password, displayName, email, id, photoUrl);
			const user = await Account.findOne({
				$or: [
					{ $and: [{ phone: phone }, { id: "" }] },
					{ $and: [{ id: id }, { id: { $ne: "" } }] },
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
