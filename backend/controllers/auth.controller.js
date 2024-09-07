import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import jwt module

export const signup = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcryptjs.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Something went wrong: ${error.message}`,
            });
        }
        const newUser = await User.create({
            email,
            username,
            name,
            level,
            password: hashedPassword,
            rollno,
        });

        // Generate token for the newly created user
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);

        // Respond with user data and token
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            token,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Wrong credentials' });
        }

        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour expiration

        // res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json({ ...rest, tokenExpiration: expiryDate });
        res.status(201).json({
            _id: validUser._id,
            name: validUser.name,
            username: validUser.username,
            email: validUser.email,
            role: validUser.role,
            token,
        });
        console.log('Signed in successfully');
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json("signout successful")
}

