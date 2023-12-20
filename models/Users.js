const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		// _id: { type: mongoose.Types.ObjectId, required: true },
		firstName: { type: "string", required: true },
		lastName: { type: "string", required: true },
		birthDay: { type: Date, required: true },
		gender: { type: "string" },
		avatar: { type: "string" },
		phone: { type: "string" },
		friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
		// token: { type: "string", required: true },
		rooms: [{ type: mongoose.Schema.Types.ObjectId }],
		idAcc: { type: "string", required: true },
	},
	{ timestamps: true }
);
// },);

module.exports = mongoose.model("users", UserSchema);