// chatSocketManager.js
module.exports = function(io) {

	io.on("connection", (socket) => {
		console.log(`Chat Socket connected: ${socket.id}`);


		socket.on("join-room", (room) => {
			socket.join(room);
			console.log(`Socket ${socket.id} joined room: ${room}`);
		});

		socket.on("send-to", (data) => {
			const userObject = JSON.parse(data);
			io.to(userObject.room).emit("recieve", userObject);
			console.log("emit:  ", userObject);
		});
	});

};
