const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	
    phone: { type: "string" },
    password: { type: "string" },
    displayName: { type: "string" },
    email: { type: "string" },
    id: { type: "string" },
    photoUrl: { type: "string" },
    serverAuthCode: { type: "string" },

});


module.exports = mongoose.model("accounts", accountSchema);;
