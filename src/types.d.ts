declare namespace Express {
    export interface Request {
      user?: { adminName: string; [key: string]: any };
    }
  }
  
