const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./Models/user");
const userRouter = require("./Routes/UserRoutes");
const adminRouter = require("./Routes/adminRouter");
const { verifyToken } = require('./Middleware/auth'); 
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));





app.use("/", userRouter);
app.use("/adminlogin", adminRouter);

mongoose.connect(process.env.MONGODB_URI, {});

app.listen(3001, () => {
  console.log("Server is Running");
});
