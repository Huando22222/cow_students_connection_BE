const Post = require('../models/Posts');


module.exports = {
	NewPost: async (req, res) => {
        try {
            const { ownerId, message } = req.body;
            const images = req.file.filename;
         

			// ownerId: { type: "string", required: true },
			// message: { type: "string" },
			// // date: { type: Date, default: Date.now }, //string ??
			// // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'images' }],
			// images: { type: "string" },
			// likes: { type: Number, required: true },
			// createdAt: { type: Date, default: Date.now },

            const post = new Post({
				ownerId: ownerId,
				message: message,
				images: imagePath,
				likes: 0,
			});
			console.log(
				images + "----------------test post ok------------------------"
			);
			// console.log(post+"----------------test post ok------------------------");
			
            await post
				.save()
				.then(() => {
					console.log("posted successfully");
					res.status(200).json({
						message: "posted successfully",
					});
				})
                .catch((err) => console.log(err));
            
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