const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  token: String,
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
