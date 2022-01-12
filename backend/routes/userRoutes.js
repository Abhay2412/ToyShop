import express from 'express';
const router = express.Router();
import { authorizeUser } from '../controllers/userController.js';


router.post('/login', authorizeUser);

export default router;