require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const express = require('express');
const app = express();

const authRoutes = require("./routes/auth")
const commentsRoutes = require("./routes/comments")
const postRoutes = require("./routes/posts")

app.use(express.json());
app.use('/api/posts',commentsRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
