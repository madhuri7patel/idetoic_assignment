const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
const UserRouter = Router();

UserRouter.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  await bcrypt.hash(password, 8, async (err, hash) => {
    if (err) {
      return res.status(500).send({ message: "Something went wrong" });
    }

    let userExist = await UserModel.findOne({ email: email });
    if (userExist != null) {
      return res.status(404).send({ message: "User already exists" });
    }

    const user = new UserModel({
      fullname: fullname,
      email: email,
      password: hash,
    });
    try {
      await user.save();
      return res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      return res.status(500).send({ message: "Something went wrong", err });
    }
  });
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(username, password);
  let hash;

  let user = await UserModel.findOne({ email: email });
  // console.log(user);
  if (user) {
    hash = user.password;
  } else {
    return res.status(404).send({ message: "User not found" });
  }

  await bcrypt.compare(password, hash, async (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Something went wrong0" });
    }

    if (result) {
      // console.log(result);
      try {
        const token = jwt.sign(
          {
            email: user?.email,
            fullname: user?.fullname,
            id: user?._id,
          },
          "SECRET"
        );
        // console.log(token);

        return res.status(200).send({
          message: "User logged in successfully",
          userId: user._id,
          token: token,
        });
      } catch (err) {
        return res.status(500).send({ message: "Sometiong went wrong1", err });
      }
    } else {
      return res
        .status(401)
        .send({ message: "Please enter valid credentials" });
    }
  });
});

module.exports = { UserRouter };
