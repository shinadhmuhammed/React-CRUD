const express = require("express");
const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "shinadhmk";

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (user && user.isAdmin) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { userId: user._id, isAdmin: true },
          SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
          isAdmin: user.isAdmin,
        });
      } else {
        console.log("Invalid password");
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Access denied. Not an admin or user not found." });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const userId = req.params.id;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, age },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const password = "123";
    const addUser = await userModel.create({
      name,
      age,
      email,
      password,
    });
    if (addUser) {
      res.status(201).json({
        msg: "user added successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  console.log("deleting started");
  try {
    const userId = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (deletedUser) {
      res.json({ msg: "delete successfully", deletedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchUser = async (req, res) => {
  try {
    const { name } = req.body;
    const users = await userModel.find({
      name: { $regex: new RegExp(name, "i") },
    });
    if (users.length > 0) {
      res.status(201).json(users);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminLogin,
  getUser,
  updateUser,
  getSingleUser,
  deleteUser,
  addUser,
  searchUser,
};
