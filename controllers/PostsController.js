const Post = require('../models/Posts');


module.exports = {
	NewPost: async (req, res) => {
        try {
            const { ownerId, message, likes } = req.body;
            const images = req.file.filename;
            // _id: { type: mongoose.Types.ObjectId, required: true },
            // ownerId: { type: "string", required: true },
            // message: { type: "string" ,},
            // // date: { type: "string", required: true }, //string ??
            // // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'images' }],
            // images: { type: "string", },
            // likes: { type: Number, required: true },
            // createdAt: { type: Date, default: Date.now },
            // const post = new Post({
			// 	ownerId,
			// 	message,
			// 	images: imagePath,
			// 	likes,
			// });
			console.log(
				images + "----------------test post ok------------------------"
			);
			// console.log(post+"----------------test post ok------------------------");
			
            // await post
			// 	.save()
			// 	.then(() => {
			// 		console.log("posted successfully");
			// 		res.status(200).json({
			// 			message: "posted successfully",
			// 		});
			// 	})
            //     .catch((err) => console.log(err));
            
            res.status(200).json({ message: "OK" });
		} catch (error) {}
	},

	GetPost: async (req, res) => {
		try {
			console.log("----------------test post ok------------------------");
			res.status(200).json({ message: "OK" });
		} catch (error) {}
	},
};