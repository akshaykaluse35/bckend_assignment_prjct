import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Authentication token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;  // Attach the decoded token to the request object
    next();  // Pass control to the next middleware or route handler
  } catch (error) {
     res.status(401).json({ message: 'Invalid token' });  // Send error response if token is invalid
     return;
  }
};
