const Post = require('../models/Posts');

module.exports = {
  NewPost: async (req, res) => {
    try {
      const { ownerId, message } = req.body;
      const images = req.file.filename;

      const post = new Post({
        ownerId: ownerId,
        message: message,
        images: images, // Correct variable name here
        likes: 0,
      });

      console.log(images + "----------------test post ok------------------------");

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
      console.log("----------------test post ok------------------------");
      res.status(200).json({ message: "OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
