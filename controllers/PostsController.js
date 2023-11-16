const Post = require('../models/Posts');

module.exports = {
  NewPost: async (req, res) => {
    try {
		const { owner, message } = req.body;
		const images = req.file? req.file.filename : "";

		const post = new Post({
			owner: owner,
			message: message,
			images: images, 
			likes: 0,
    });

      console.log( "----------------test image ok------------------------");
      console.log( "----------------test image ok------------------------");
      console.log(images );

      await post
        .save()
        .then(() => {
          console.log("posted successfully");
          res.status(200).json({
            message: "posted successfully",
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
    }
  },

  GetPost: async (req, res) => {
	try {
		console.log("----------------send posts to client------------------------");
		const post = await Post.find()
			.populate("owner")
			.sort({ createdAt: -1 });
		res.status(200).json({ message: "OK" , data : post});
    } catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
    }
  },
};
