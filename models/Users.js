const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		//  _id: { type: mongoose.Types.ObjectId, required: true  },
		name: { type: "string", required: true },
		// firstName: { type: "string", required: true },
		// middleName: { type: "string", required: true },
		// lastName: { type: "string", required: true },
		// age: { type: Number, required: true },
		// token: { type: "string", required: true },
		// avatar: { type: "string" },
	},
	{ timestamps: true }
);
// },);

module.exports = mongoose.model("users", UserSchema);