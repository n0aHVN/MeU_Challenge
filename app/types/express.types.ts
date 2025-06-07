import { Request } from 'express';
declare global {
  namespace Express {
    interface Request {
      currentUser?: {
            email: string,
            username: string
      }; // Or a more specific type instead of `any`
    }
  }
}
