import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin';
import AssignmentModel from '../models/assignment';

// Custom Request Type
interface CustomRequest extends Request {
  user?: { adminName: string };
}

// Register Admin
export const registerAdmin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { adminName, password } = req.body;
  if (!adminName || !password) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await AdminModel.create({ adminName, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

// Login Admin
export const loginAdmin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { adminName, password } = req.body;
  if (!adminName || !password) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  try {
    const admin = await AdminModel.findOne({ adminName });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const getAssignments: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  const adminName = req.user?.adminName;

  if (!adminName) {
    res.status(400).json({ message: 'Admin not found in token' });
    return;
  }

  try {
    const assignments = await AssignmentModel.find({ admin: adminName });
    res.json({ assignments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error });
  }
};

// Accept Assignment
export const acceptAssignment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const assignment = await AssignmentModel.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
    res.json({ message: 'Assignment accepted', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting assignment', error });
  }
};

// Reject Assignment
export const rejectAssignment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const assignment = await AssignmentModel.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    res.json({ message: 'Assignment rejected', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting assignment', error });
  }
};
