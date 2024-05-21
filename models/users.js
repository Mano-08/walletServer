const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  portfolio: { type: String, required: true },
  expertise: { type: [String], required: true },
  expLevel: { type: String, required: true },
  collabTypes: { type: [String], required: true },
  walletAddress: { type: String, index: true, unique: true, required: true },
  profilePicURL: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
