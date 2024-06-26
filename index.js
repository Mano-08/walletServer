const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/users");
const cors = require("cors");
const port = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to db");
  });
  console.log(`Server is running on port ${port}`);
});

app.post("/api/create-user", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await User.create(data);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/get-user", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await User.findOne({ walletAddress });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/upload-profile-pic", async (req, res) => {
  try {
    const { walletAddress, profilePicURL } = req.body;
    const user = await User.findOneAndUpdate(
      { walletAddress },
      { profilePicURL }
    );
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
