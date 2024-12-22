import userModel from "../models/userModel.js";
import { comparePassword, hashedPassword } from "../utils/util.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

// REGISTERATION
export const registerationController = async (req, res) => {
  try {
    const { name, email, password, gender, mobile, address } = req.body
    switch (true) {
      case !name:
        return res.status(404).send({ msg: "Name is required!!" });
      case !email:
        return res.status(404).send({ msg: "Email is required!!" });
      case !password:
        return res.status(404).send({ msg: "Password is required!!" });
      case !gender:
        return res.status(404).send({ msg: "Gender is required!!" });
      case !mobile:
        return res.status(404).send({ msg: "Mobile is required!!" });
      case !address:
        return res.status(404).send({ msg: "Address is required!!" })
    }
    const hashed = await hashedPassword(password)
    const user = new userModel({name,email,password: hashed,gender,mobile,address})
    await user.save();
    res.status(201).send({success: true,message: "User registered successfully!",user})
  }
  catch (error) {
    res.status(500).send({success: false,messsage: "error while registering a user ....",error})
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ success: false, message: "Email and Password are required!" });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "You are not registered! Please register first.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        mobile: user.mobile,
        gender: user.gender,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login...",
      error,
    });
  }
};
