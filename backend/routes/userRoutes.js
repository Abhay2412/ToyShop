import express from 'express';
const router = express.Router();
import { authorizeUser, registerUser, getUserProfile, updateUserProfile, getUsers } from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authorizeUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;