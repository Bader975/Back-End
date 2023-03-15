import { prisma } from "../config/db";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { User } from "@prisma/client";

import express, { Application, Request, Response } from "express";
import { date } from "zod";
const app: Application = express();
app.use(express.json());

// Creat
export const createUser = async (req: Request, res: Response) => {
    let hashedPassword = await argon2.hash(req.body.password);
   
    try {
      const newUser = await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          password: hashedPassword,
         role:req.body.role as Role
        },
      });

      let newprofile=await prisma.profile.create({
        data:{
          userID:newUser.id
        }
      })
  
      if (newUser) {
        res.status(200).json({ message: "تم انشاء الحساب بنجاح", newUser ,
      hh:"the profile is",newprofile});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const UpdateUser = async (req: Request, res: Response) => {
    try {
        let user=await prisma.user.updateMany({
            where: {
                id:res.locals.user.id
              },
              data:
              {
                name:req.body.name,
                phone_number:req.body.phone_number,
              }
        })
        res.json({
          message:"تم تحديث بياتات المستخدم",
            
        })
        
    } catch (error) {
        console.log(error);
    }
  }

// Loging

export const Login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    //   ES6 if else
    if (!user) {
      res.json({ message: "worng email address!!" });
    } else if (!(await argon2.verify(user.password, req.body.password))) {
      res.json({ message: `worng password !! ` });
    } else {
      let token = jwt.sign(
        {
          id: user.id,
          name:user.name,
          role:user.role
        },
        process.env.MY_SECRETKEY as string,
        { expiresIn: "3h" }
      );

      res
        .status(200)
        .send({
          message: `اهلا وسهلا بك ${user.name} `,
          token: token,
          role:user.role,
          name:user.name
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserByID = async (req: Request, res: Response) => {
    try {
        
        let user=await prisma.user.findMany({
            where:{
                id:res.locals.id
            }
        })
        res.json({
            user
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

export const countAlluser = async (req: Request, res: Response) => {
    try {
        
        let numOfuser=await prisma.user.count({
            where:{
                role:'User'
            }
        })
        res.json({
            numOfuser
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

export const getAlluser = async (req: Request, res: Response) => {
    try {
        
        let alluser=await prisma.user.findMany()
        res.json({
            alluser
        })
        
    } catch (error) {
        console.log(error);
        
    }

}
