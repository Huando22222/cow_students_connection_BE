const PostLocation = require('../models/PostLocations');
const User = require('../models/Users');

module.exports = {
  NewPostLocation: async (req, res) => {
    try {

      const { owner, message, latitude, longitude } = req.body;
      console.log(owner+ "- "+ message+ "- "+ latitude+"- "+ longitude);
      const postLocation = new PostLocation({
        owner: owner,
        message: message,
        location: {
            latitude:latitude,
            longitude:longitude,
        }
      });

      await postLocation.save();
      const newPostLocation = await PostLocation.findOne({ owner: owner }).sort({ createdAt: -1 }).populate("owner");
      
      res.status(200).json({
        message: "posted successfully",
        postLocation: newPostLocation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  GetPostLocations: async (req, res) => {
    try {
      const postLocations = await PostLocation.find().populate("owner").sort({ createdAt: -1 });
      res.status(200).json({  data: postLocations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
