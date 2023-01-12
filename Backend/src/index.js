const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { UserRouter } = require("./Routes/UserRouter");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_URL;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Homepage");
});

mongoose
  .connect(mongodb_url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("something went wrong while connecting to mongoose", err);
  });
