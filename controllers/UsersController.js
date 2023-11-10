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
				console.log(acc+"\n"+user + "\n----------------test------------------------");
				res.status(200).json({
					message: "OK",
					account: acc,
					user: user ,
				});
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
