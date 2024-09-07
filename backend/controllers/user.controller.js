import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                },
            }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.role === 'admin') {
        return next(errorHandler(401, 'You cannot delete your account'))
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is an admin
        if (!isAdmin) {
            return next(errorHandler(403, 'You are not admin so you are not allowed to see users'))
        }
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 20;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });
        const totalUsers = await User.countDocuments();
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });
        res.status(200).json({
            users: userWithoutPassword,
            totalUsers,
            lastMonthUsers,
        })
    } catch (error) {
        next(error)
    }
}


