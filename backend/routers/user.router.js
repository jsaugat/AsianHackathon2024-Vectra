import express from 'express';
import { deleteUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/all-users', verifyToken, getUsers);
// router.get('/all-users', getUsers);

export default router;