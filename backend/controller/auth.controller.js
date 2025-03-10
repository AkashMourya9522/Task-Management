import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(401).json({
      success: false,
      message: "Email Already Taken",
    });
  } else {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    
    if (user) {
      const comparePassword = bcryptjs.compareSync(password, user.password);
      if (comparePassword) {
        const userId = user._id;
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
        const { password, ...userDetails } = user._doc;
        res.status(200).cookie("access_token", token).json(userDetails);
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid Details",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};
