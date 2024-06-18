const express = require("express");
const mongoose = require("mongoose");
const reservationRoute = require("./controller/reservationRoute");
const userRoute = require("./controller/userRoute");

const app = express();

var cors = require('cors');
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://booking:book256@reserv.rstvcwb.mongodb.net/bookingdb");
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to db"));
db.on("error",()=>console.log("Error occurred"));

app.use("/reservationRoute",reservationRoute);
app.use("/userRoute",userRoute);

app.listen(5000,()=>{
    console.log("Server started at 5000");
})