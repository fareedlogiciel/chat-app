const express = require("express");
const User = require("../models/user");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../env-constants");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  User.find({ email })
    .exec()
    .then((user) => {
      if (user?.length > 0) {
        return res
          .status(409)
          .json({ message: "User with this email already exists!" });
      } else {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error: "Failed to hash the password!",
              message: "User could not be created!",
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name,
              email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                return res
                  .status(201)
                  .json({ message: "User created.", user: result });
              })
              .catch((error) => {
                return res.status(500).json({ error });
              });
          }
        });
      }
    })
    .catch(() => {
      return res.status(500).json({
        message: "User could not be created!",
      });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.find({ email })
    .exec()
    .then((user) => {
      if (user?.length < 1) {
        return res
          .status(404)
          .json({ message: "User with this email does not exists!" });
      } else {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err || !result) {
            return res.status(401).json({
              message:
                "Login failed! Please try again with different credentials",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0]?.email,
                userId: user[0]?._id,
              },
              JWT_KEY,
              { expiresIn: "1d" }
            );
            const userData = {
              _id: user[0]?._id,
              name: user[0]?.name,
              email: user[0]?.email,
              token,
            };
            return res
              .status(200)
              .json({ message: "Logged in successfully!", userData });
          }
        });
      }
    })
    .catch(() => {
      return res.status(401).json({
        message: "Login failed! Please try again later!",
      });
    });
});

module.exports = router;
