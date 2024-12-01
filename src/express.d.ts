import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // Adjust based on the structure of your JWT payload
    }
  }
}
