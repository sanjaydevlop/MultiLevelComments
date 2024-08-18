const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try{
    const user = new User({ username, email, password });
    await user.save();
    const token = generateToken(user._id);
    res.json({ token });
  }
  catch(e){
    return res.status(400).json({ error: e });
  }
  
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user._id);
  res.json({ token });
};
