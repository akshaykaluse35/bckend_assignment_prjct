import express from 'express';
import { 
  registerAdmin, 
  loginAdmin, 
  getAssignments, 
  acceptAssignment, 
  rejectAssignment 
} from '../controllers/adminController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', authenticate, getAssignments);
router.post('/assignments/:id/accept', authenticate, acceptAssignment);
router.post('/assignments/:id/reject', authenticate, rejectAssignment);

export default router;
