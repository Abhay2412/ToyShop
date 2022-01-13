import express from 'express';
const router = express.Router();
import { authorizeUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authorizeUser);
router.route('/profile').get(protect, getUserProfile);

export default router;