const RoomSchema = new mongoose.Schema(
	{
		roomName: { type: "string", required: true },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("rooms", RoomSchema);
