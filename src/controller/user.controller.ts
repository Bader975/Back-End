import { prisma } from '../config/db';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import express, { Application, Request, Response } from "express";
const app: Application = express();
app.use(express.json());





// Loging


export const Login = async (req: Request, res: Response) => {
    
        const { email} = req.body;
        const user = await prisma.user.findUnique({

            where: {
                email,
            }


        });



        //   ES6 if else
        if (!user) { res.json({ message: "worng email address!!" }); 
    }
         else if 

            (!await argon2.verify(user.password, req.body.password)){
            res.json({ message: `worng password !! ` });
        }else{
            let token = jwt.sign({ 
                id: user.id,
                
             }, process.env.MY_SECRETKEY as string,{expiresIn:'5h'});

            res.status(200).send({ message:`Hello Aging ${user.name }  And Your email ${user.email}`,
            token:token
        });
        }


    
    // catch (error) {
    //     console.log(error);
    // }
};


// Read 
export const getallUsers = async (req: Request, res: Response) => {
    let users = await prisma.user.findMany()
    res.json(users);
    // res.json();
}
export const Hello = async (req: Request, res: Response) => {

    res.json({ "msg": "Hello visters" })
}


// Creat
export const createUser = async (req: Request, res: Response) => {
    let hashedPassword = await argon2.hash(req.body.password);
    try {
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword
            }
        });

        if (newUser) {
            res.status(200).json({ "msg": "The user has been created", newUser })
        }
    }
    catch (error) {
        res.status(500).json(error)

    }
}



