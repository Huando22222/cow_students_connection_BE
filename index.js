// const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const route = require("./routes");


////socket zone
const server = require("http").Server(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});
require('./sockets/chat')(io);



// app.use(express.static('images'));
app.use(express.static('public'));
// app.use(express.static(path.join("./BE_projMobileApp", "images")));
const port = 3000;
// app.use(express.static(path.join(__dirname, "public/images")));

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		console.log(
			"db connected\n----------------------------------------------------"
		)
	)
	
app.use(cors());
// const corsOptionsRoute1 = {
// 	origin: "http://example.com/route1",
// 	methods: "GET,PUT",
// };
app.use(
	express.json({
		/*limit: "10mb",*/
	})
);
app.use(express.urlencoded({ /*limit: "10mb",*/ extended: true }));

route(app);
//app.listen
server.listen(process.env.PORT || port, () =>
	console.log(
		`Example app listening on port ${process.env.PORT}!\nhttp://cmd => ipconfig:${process.env.PORT}\nhttp://192.168.1.47:${process.env.PORT}\n(depending on your ipconfig address)`
	)
);

///////////////////////////////////////////----------------------------------------------------------------
// const path = require("path");
// const express = require("express");
// const app = express();
// const server = require("http").Server(app);
// const io = require("socket.io")(server);

// // server.listen(3000, () => console.log("connected"));


// io.on("connection", socket => {
// 	console.log(`Chat Socket connected: ${socket}`);
	
// 	socket.on("join-room", (arg1, arg2) => {
// 		// socket.emit("join-room-emit", { arg1, arg2 });
// 		console.log("join-room: ", arg1, arg2);
// 	});
	
// });
// server.listen(3000, () => console.log("connected"));