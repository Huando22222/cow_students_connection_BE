const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	phone: { type: "string" },
	password: { type: "string" },
	displayName: { type: "string" },
	email: { type: "string" },
	id: { type: "string" },
	photoUrl: { type: "string" },
	createdAt: { type: Date, default: Date.now },
	// serverAuthCode: { type: "string" },
});


module.exports = mongoose.model("accounts", accountSchema);
