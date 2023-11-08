const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const route = require("./routes");
dotenv.config();

// app.use(express.static('images'));
// app.use(express.static(path.join("./BE_projMobileApp", "images")));
const port = 3000;

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

app.listen(process.env.PORT || port, () =>
	console.log(
		`Example app listening on port ${process.env.PORT}!\nhttp://localhost:${process.env.PORT}\nhttp://192.168.1.47:${process.env.PORT}\n(depending on your ipconfig address)`
	)
);
