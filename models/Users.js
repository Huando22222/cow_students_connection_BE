const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		_id: { type: mongoose.Types.ObjectId, required: true },
		firstName: { type: "string", required: true },
		lastName: { type: "string", required: true },
		age: { type: Number, required: true },
		birthDate: { type: Date, required: true },
		token: { type: "string", required: true },
		avatar: { type: "string" },
		idAcc: {type: "string", required: true}
	},
	{ timestamps: true }
);
// },);

module.exports = mongoose.model("users", UserSchema);