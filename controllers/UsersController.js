const User = require("../models/Users");
const Account = require("../models/Accounts");
const path = require("path");
module.exports = {
	test: async (req, res) => {
		try {

			res.status(200).json({
				message: "OK",
			});
		} catch (error) {
			res.status(500).json("false load user");
		}
	},
	test1: async (req, res) => {
		try {
			res.status(200).json({
				message: "OK",
			});
		} catch (error) {
			res.status(500).json("false load user");
		}
	},
	LoginUser: async (req, res) => {
		try {
			const { phone, password } = req.body;
			console.log("user has:" + phone, password);

			const acc = await Account.findOne({
				phone: phone,
				password: password,
			});

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
	
	profileUpdate: async (req, res) => {
		try {
			const { firstName, lastName, birthDay, gender, phone, idAcc } = req.body;
	
			const avatar = req.file ? req.file.filename : null;

			console.log(
				"user profile updated: " +
				firstName,
				lastName,
				birthDay,
				gender,
				phone,
				idAcc
			);
	
			const existingUser = await User.findOne({ idAcc });
	
			if (avatar !== null) {
				existingUser.avatar = avatar;
			}
	
			existingUser.firstName = firstName || existingUser.firstName;
			existingUser.lastName = lastName || existingUser.lastName;
			existingUser.birthDay = birthDay || existingUser.birthDay;
			existingUser.gender = gender || existingUser.gender;
			existingUser.phone = phone || existingUser.phone;
	
			const updatedUser = await existingUser.save();
	
			res.status(200).json({
				message: "User profile updated successfully",
				user: updatedUser,
			});
		} catch (error) {
			res.status(500).json({ message: "Failed to update user profile" });
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
			// console.log(
			// 	"user profile: " + firstName,
			// 	lastName,
			// 	birthDay,
			// 	gender,
			// 	phone,
			// 	idAcc
			// );

			const user = new User({
				firstName,
				lastName,
				birthDay,
				gender,
				avatar: avatar,
				phone,
				idAcc,
			});
			// console.log("profile filled " + user);
			await user
				.save()
				.then(() => {
					// console.log("profile filled thành công " + user);
					res.status(200).json({
						message: "profile filled thành công",
						user: user,
					});
				})
				.catch((err) => console.log(err));
		} catch (error) {
			res.status(500).json("false load user");
		}
	},
	

	RegisterUser: async (req, res) => {
		try {
			const { phone, password, displayName, email, id, photoUrl } =
				req.body;
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
