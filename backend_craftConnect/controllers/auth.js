// controllers/auth.js
import jwt from "jsonwebtoken";
import User from "../models/users.js";

// Register user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
