
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface IUser {
  id: string;
  role: string;
  name:string
}

const protect = (req: Request, res: Response, next: NextFunction) => {
  try { 
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        message: 'You are not authorized 88to enter this route',
      });
    }
    
    const user = jwt.verify(header, process.env.MY_SECRETKEY as string) as IUser;

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'You are not authorized to 33enter this route',
    });
  }
};

const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user as IUser;
    console.log(user);
    
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: 'You are not authorized to gg enter this route !',
      });
    }
    next();
  };

export { protect, authorize };