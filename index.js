//imoprt
const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routers/userRoute");
const adminRoute = require("./routers/adminRoute");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

//database connection
mongoose.set("strictQuery", "true");
mongoose.connect(process.env.MONGO);
console.log("Database Connected");

//use express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware
app.use((req, res, next) => {
  console.log('Time: Is running', Date.now())
  next()
})

//for user route
app.use("/", userRoute);

//for admin route
app.use("/admin", adminRoute);

app.listen(3000, function () {
  console.log("Server is running");
});
