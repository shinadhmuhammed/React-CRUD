const express = require("express");
const userModel = require("../Models/user");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const SECRET_KEY='shinadhmk'
const mongoose=require('mongoose')


const registerUser = async (req, res) => {
  let { name, email, age, password } = req.body;
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email is already in use" });
  }
  const hashedPassword=await bcrypt.hash(password,10)
  const userData = await userModel.create({
    name,
    email,
    age,
    password:hashedPassword
  });
  if (userData) {
    res.status(201).json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      age: userData.age,
      age: userData.password,
    });
  } else {
    res.status(400);
    throw new Error();
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      });
    } else {
      res.status(401).json({ message: 'Invalid ' });
    }
  } else {
    res.status(401).json({ message: 'Invalid ' });
  }
};





const updatePicture = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await userModel.findById(id);

    if (user) {
      user.img = req.file.filename.replace(/\\/g, '/');
      await user.save();

      res.status(201).json({
        img: user.img,
      });
    } else {
      res.status(404).json({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};






module.exports = {
  registerUser,
  loginUser,
  updatePicture,
};
