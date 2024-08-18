const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const { text } = req.body;
  const post = new Post({text, userId: req.user.userId });
  await post.save();
  res.status(201).json(post);
};
