
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
        message: 'عذراً ! ليس لديك صلاحية لدخول هذه الصفحة',
      });
    }
    
    const user = jwt.verify(header, process.env.MY_SECRETKEY as string) as IUser;

    res.locals.user = user as IUser ;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'عذراً ! ليس لديك صلاحية لدخول هذه الصفحة',
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
        message: 'عذراً ! ليس لديك صلاحية لدخول هذه الصفحة',
      });
    }
    next();
  };

export { protect, authorize };