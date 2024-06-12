const express = require('express');
const userSchema = require("../models/userSchema");
const userRoute = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Signup
userRoute.post('/', (req,res,next) => {
  userSchema.create(req.body, (err,data)=> {
    if(err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});


// Login Route
userRoute.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  // Logout
  userRoute.post('/logout', (req, res) => {
    // The client can clear the token on their side
    res.json({ message: 'Logout successful' });
  });
  
module.exports = userRoute;