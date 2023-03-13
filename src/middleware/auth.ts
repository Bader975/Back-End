// import { NextFunction, Request, Response } from "express";
// import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";

// interface User {
//     id: string,
//     name: string
    
// }

// const auth = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let token = req.headers.authorization;

//         if (!token) {
//             return res.status(403).json({ "message": "Access Denaied" });
//         }
//         let user = jwt.verify(token, process.env.MY_SECRETKEY as string) as User
//         console.log(user);
//         // make ID in vairabale 
//         res.locals.user = user;
//         next();
//     } 
//     catch (error) {
//         res.json({ error: error });
//     }



// }
// export default auth;
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
    // const token = header.split(' ')[1];

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