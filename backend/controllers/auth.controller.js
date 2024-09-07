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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return res.status(404).json({ message: 'User not found' });
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });
      
      const token = jwt.sign({ id: validUser._id, role: validUser.role }, '23787234hello123heiihelosdufoi');
      const { password: hashedPassword, ...rest } = validUser._doc;
      
      const expiryDate = new Date(Date.now() + 3600000); // 1 h from now
      
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ ...rest, tokenExpiration: expiryDate }); // Sending token expiration date to client
        
      console.log('User signed in successfully');
    } catch (error) {
      next(error);
    }
  };