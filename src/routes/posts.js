const express = require('express');
const { createPost} = require('../controllers/postController');
const { verifyToken } = require('../utils/jwt');
const router = express.Router();


router.post('/createpost', verifyToken,createPost);

module.exports = router;
