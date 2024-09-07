import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; // Fixed import spelling
import jwt from 'jsonwebtoken'; // Kept this since it's included but unused for now

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, role, address } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcryptjs.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error hashing the password',
      });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      address,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
