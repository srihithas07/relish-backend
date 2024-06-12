const express = require("express");
const reservationSchema = require("../models/reservationSchema");
const reservationRoute = express.Router();
const mongoose = require("mongoose");

// Create Reservation
reservationRoute.post('/create-reservation', (req, res) => {
  const { name, email, date } = req.body;
  const formattedDate = new Date(date);
  const generateConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const confirmationCode = generateConfirmationCode();
  reservationSchema.create({ name, email, date: formattedDate, confirmationCode }, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Reservation added successfully', confirmationCode });
    }
  });
});


// To get all reservations
reservationRoute.get("/reservation-details", async (req, res) => {
  try {
    const reservations = await reservationSchema.find();
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve reservation details for a specific user
reservationRoute.get('/user-reservations/:email', (req, res) => {
  const userEmail = req.params.email;
  reservationSchema.find({ email: userEmail }, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json(data);
    }
  });
});

// To update reservation
reservationRoute.route("/update-reservation/:id").get((req,res,next) => {
  reservationSchema.findById(req.params.id, (err, data) => {
    if(err) {
      return next(err);
    } else {
      console.log("Hi from server");
      return res.json(data);
    }
  });
})
.put((req,res,next) => {
  reservationSchema.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err,data) => {
      if(err) {
        return next(err);
      } else {
        return res.json(data);
      }
    }
  );
});

// Delete reservation
reservationRoute.delete("/deletereservation/:id",(req,res)=>{
  reservationSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
  (err,data)=>{
    if(err)
      return err;
    else 
      res.json(data);
  });
});

module.exports = reservationRoute;