import express, { Request, Response } from 'express';
import { registerUser, loginUser, uploadAssignment, fetchAdmins } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Explicitly type these as RequestHandler
router.post('/register', registerUser as express.RequestHandler);
router.post('/login', loginUser as express.RequestHandler);
router.post('/upload', authenticate, uploadAssignment as express.RequestHandler);
router.get('/admins', fetchAdmins as express.RequestHandler);

export default router;
