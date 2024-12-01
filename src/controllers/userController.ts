import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import AssignmentModel from '../models/assignment';
import AdminModel from '../models/admin';
import dotenv from 'dotenv';
dotenv.config();


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
     res.status(400).json({ message: 'All fields are required.' });
     return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
     res.status(400).json({ message: 'All fields are required.' });
     return;
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
       res.status(401).json({ message: 'Invalid credentials' });
       return;
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in, try again later', error });
  }
};

export const uploadAssignment = async (req: Request, res: Response): Promise<void> => {
  const { task, admin } = req.body;
  const userId = (req as any).user.id;

  if (!task || !admin) {
    res.status(400).json({ message: 'Task and admin are required.' });
    return ;
  }

  try {
    const assignment = await AssignmentModel.create({ userId, task, admin, status: 'pending' });
    res.status(201).json({ message: 'Assignment uploaded successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading assignment', error });
  }
};

export const fetchAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await AdminModel.find({}, 'adminName');
    res.json({ admins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};
