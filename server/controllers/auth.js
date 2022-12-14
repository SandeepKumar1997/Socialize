import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      impressions,
    } = req.body;

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const searchUser = await User.findOne({ email: email });
    if (!searchUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const matchPassword = await bcrypt.compare(password, searchUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const token = jwt.sign({ id: searchUser._id }, process.env.JWT_SECRET);
    delete searchUser.password;
    res.status(200).json({ token, searchUser });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};
