const userRouter = require("./users");
const postsRouter = require("./posts");

function route(app) {
	app.use("/user", userRouter);
	app.use("/post", postsRouter);
}

module.exports = route;
