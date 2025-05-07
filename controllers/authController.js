const User = require('../models/Account');
const jwt = require('jsonwebtoken');

// JWT token üretici
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d' // 7 gün geçerli
  });
};

// REGISTER (POST /api/auth/register)
exports.register = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Kullanıcı zaten var.' });
  }

  const user = new User({ username, password });
  await user.save();

  const token = generateToken(user._id);
  res.status(201).json({ token });
};

// LOGIN (POST /api/auth/login)
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre.' });
  }

  const token = generateToken(user._id);
  res.json({ token });
};
