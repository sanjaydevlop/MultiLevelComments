const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;
  
  try {
    const comment = new Comment({ postId, text, userId: req.user.userId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error });
  }
};

exports.replyToComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;
  try{
    const reply = new Comment({ postId, text, userId: req.user.userId, parentCommentId: commentId });
    await reply.save();
    res.status(201).json(reply);
  }
  catch(error){
    res.status(500).json({ message: "Failed to reply to a  comment", error });
  }
};

exports.getComments = async (req, res) => {
    const { postId } = req.params;
    const { sortBy = 'createdAt', sortOrder = 'desc', page = 1, pageSize = 10 } = req.query;
  
    const comments = await Comment.find({ postId, parentCommentId: null })
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();
  
    // Add replies to each comment
    for (const comment of comments) {
      comment.replies = await Comment.find({ parentCommentId: comment._id })
        .sort({ createdAt: 'desc' })
        .limit(2)
        .lean();
      comment.totalReplies = await Comment.countDocuments({ parentCommentId: comment._id });
    }
  
    res.json(comments);
  };
  
  exports.expandCommentReplies = async (req, res) => {
    const { commentId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
  
    const replies = await Comment.find({ parentCommentId: commentId })
      .sort({ createdAt: 'asc' })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();
  
    res.json(replies);
  };
  