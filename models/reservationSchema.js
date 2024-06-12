const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  confirmationCode: { type:Number },
},
  {
    collection: "reservations"
  
  });


const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = mongoose.model("reservationSchema", reservationSchema);