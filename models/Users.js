const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		_id: { type: mongoose.Types.ObjectId, required: true },
		firstName: { type: "string", required: true },
		lastName: { type: "string", required: true },
		birthDay: { type: Date, required: true },
		gender: { type: "string", },
		avatar: { type: "string", },
		phone: { type: "string", },
		// token: { type: "string", required: true },
		idAcc: {type: "string", required: true}
	},
	{ timestamps: true }
);
// },);

module.exports = mongoose.model("users", UserSchema);