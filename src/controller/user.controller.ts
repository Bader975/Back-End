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
  
      if (newUser) {
        res.status(200).json({ msg: "The user has been created", newUser });
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
            msg:"user updated",
            
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
          message: `Hello Aging ${user.name}  And Your email ${user.email}`,
          token: token,
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


// import { prisma } from "../config/db";
// import nodemailer from "nodemailer";
// import { Request, Response } from "express";
// import { UserSchemaType } from "../schemas/userSchema";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
// import { Users } from "@prisma/client";
// import * as argon2 from "argon2";

// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const getAllUsers = await prisma.users.findMany();
//     return res.status(200).json(getAllUsers);
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       message: "server Error !",
//     });
//   }
// };
// const generateCode = (): string => {
//   const num = Math.floor(Math.random() * 10000);
//   const code = num.toString().padStart(4, "0");
//   return code;
// };
// export const Regester = async (req: Request, res: Response) => {
//   try {
//     const newUser = req.body as UserSchemaType;

//     const code = generateCode();
//     const hash = await argon2.hash(newUser.password); // تشفير كلمة المرور

//     const newUserWithCode = {
//       ...newUser,
//       password: hash,
//       code,
//     };

//     await prisma.users.create({ data: newUserWithCode });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "test.506112@gmail.com",
//         pass: "szvcbsdjtiqwedwq",
//       },
//     });

//     const mailOptions = {
//       from: "test.506112@gmail.com",
//       to: newUser.email,
//       subject: "Welcome to My Website",
//       text: `Thank you for registering on our website! Your verification code is ${code}`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(transporter);

//     return res.status(201).json({
//       message: "User added successfully",
//     });
//   } catch (error) {
//     const prismaError = error as PrismaClientKnownRequestError;
//     if (prismaError.code == "P2002") {
//       return res.status(400).json({
//         message: "Your email has been used before",
//       });
//     } else {
//       return res.status(500).json({
//         message: "Server error",
//       });
//     }
//   }
// };
// export const VerifyCode = async (req: Request, res: Response) => {
//   try {
//     const { email, code } = req.body as { email: string; code: string };
//     const user = await prisma.users.findUnique({ where: { email } });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//     if (user.code !== code) {
//       return res.status(400).json({
//         message: "Invalid verification code",
//       });
//     }
//     await prisma.users.update({
//       where: { id: user.id },
//       data: { isVerified: true, code: null },
//     });
//     return res.status(200).json({
//       message: "User verified successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// export const Login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await prisma.users.findUnique({
//       where: { email },
//     });

//     if (!user?.email) {
//       return res
//         .status(401)
//         .json({ message: "Ooh! The account does not exist" });
//     }
//     // Check Passord Entrance Matching with database
//     const passwordMatch = await argon2.verify(user.password, password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // check if user is verified
//     if (!user.isVerified) {
//       return res.status(401).json({ message: "Account is not verified" });
//     }

//     return res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const ForgotPassword = async (req: Request, res: Response) => {
//   try {
//     const { email, newPassword } = req.body as {
//       email: string;
//       newPassword: string;
//     };
    
//     const user = await prisma.users.findUnique({ where: { email } });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//     const hashedPassword = await argon2.hash(newPassword);
//     // Update user's password
//     await prisma.users.update({
//       where: { id: user.id },
//       data: { password: hashedPassword },
//     });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "test.506112@gmail.com",
//         pass: "szvcbsdjtiqwedwq",
//       },
//     });

//     const mailOptions = {
//       from: "test.506112@gmail.com",
//       to: user.email,
//       subject: "Password Reset",
//       text: `تمت إعادة ضبط كلمة المرور الخاصة بك بنجاح. كلمة السر الجديدة الخاصة بك   ${newPassword}. يرجى تسجيل الدخول إلى حسابك باستخدام كلمة المرور هذه وتغييرها على الفور.`,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({
//       message: "Password reset successful. Check your email for new password",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// export const forgotEmail = async (req: Request, res: Response) => {
//   try {
//     const { phoneNumber } = req.body as Users;

//     const user = await prisma.user.findUniqueOrThrow({
//       where: { phoneNumber },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const email = user.email;

//     const nodemailer = require("nodemailer");

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "test.506112@gmail.com",
//         pass: "szvcbsdjtiqwedwq",
//       },
//     });

//     const mailOptions = {
//       from: "test.506112@gmail.com",
//       to: email,
//       subject: "Forgot Email",
//       text: `Your email is: ${email}`,
//     };

//     transporter.sendMail(mailOptions, (error: any, info: any) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Server error" });
//       } else {
//         console.log("Email sent: " + info.response);
//         return res.status(200).json({
//           message: "Email sent to the user's email",
//         });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };