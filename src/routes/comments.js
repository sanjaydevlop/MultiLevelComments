const express = require('express');
const { createComment, replyToComment,getComments,expandCommentReplies } = require('../controllers/commentController');
const { verifyToken } = require('../utils/jwt');
const { commentRateLimiter } = require('../middlewares/rateLimit');
const router = express.Router();

router.post('/:postId/comments', verifyToken, commentRateLimiter, createComment);
router.post('/:postId/comments/:commentId/reply', verifyToken, commentRateLimiter, replyToComment);
router.get('/:postId/comments', verifyToken,getComments);
router.get('/:postId/comments/:commentId/expand', verifyToken,expandCommentReplies);

module.exports = router;


