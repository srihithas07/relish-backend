const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
},
{
  collection: "userdetails"
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  const hash = await bcrypt.hash(user.password, saltRounds);
  user.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;