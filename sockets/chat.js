// chatSocketManager.js
const Message = require("../models/Messages");
const Room = require("../models/Rooms");

function generateRandomRoomName(length) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

module.exports = function (io) {

	io.on("connection", (socket) => {
		console.log(`Chat Socket connected: ${socket.id}`);


		socket.on("join-room", async (room) => {// khi tao moi user thi user da tạo sẵn phòng với id là id user của user rồi
			socket.join(room);
			//check ng dung co trong room khong ?? => middleware // later add this
			const data = await Message.find({ room: room }).populate("sender"); //{room: room}
			//hinh nhu chi emit toi ng gui su kien ?? hay toan bo server???
			io.to(room).emit("server-message" , data );
			console.log(
				`Socket ${socket.id} joined room: ${room} - data: ${data.length}`
			);
		});
		/// on create room ?
		socket.on("create-room", async (member) => { 
			if (Array.isArray(member) && member.length > 0) {
				// console.log("Received members:", member[0]);
				const newRoom = new Room({
					roomName: generateRandomRoomName(10),
					users: member,
				});
				await newRoom.save()
				const data = await Room.findOne({
					_id: newRoom._id,
				}).populate("users");	

				if (data != null) {
					io.to(member).emit("add-room", data); // thieu du kien tối về update
					console.log("created room:", data);
				} else {
					console.log("false in find room process");
				}
				// io.to(member).emit("add-room", room); // thieu du kien tối về update
				// console.log("created room:", room);
				member.forEach((userId) => {
					console.log("room userID:", userId);
				});
			} else {
				console.log("Invalid member data received.");
			}
		});



		socket.on("send-to", async(data ) => { //////// dung rồi k cần sửa nữa thằng ngu huấnnnnnnnnn
			const message = JSON.parse(data);
			const newMessage = new Message(message);
			console.log(newMessage.sender);

			await newMessage.save().then(() => {
				io.to(newMessage.room).emit("recieve", newMessage);
				console.log("emit:  ", newMessage);
			});

			
			// io.to(message.room).emit("recieve", message);
			// console.log("emit:  ", message);
		});
	});

};
