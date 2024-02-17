const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

// UserModel.createCollection();

module.exports = UserModel;
