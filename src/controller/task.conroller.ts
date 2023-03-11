import { prisma } from "../config/db";
import express, { Application, Request, Response } from "express";
import auth from "../middleware/auth";
import { log } from "console";
const app: Application = express();
app.use(express.json());

export const getUserTask = async (req: Request, res: Response) => {
    try {
        
        let tasks = await prisma.task.findMany({
            where: {
                userId:res.locals.user.id,
            },
            // select: {
            //     title: true,

            //     user: {
            //         select: {
            //             name: true,
            //         },
            //     },
            // },
        });
        if (tasks) {
            res.status(200).json(tasks);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createTask = async (req: Request, res: Response) => {
    let {title}=req.body;
    // console.log(res.locals.user);
    
    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                userId: res.locals.user.id,
            },
        });
        if (newTask) {
            res.status(200).json({ msg: "The Task has been created", newTask });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


export const updateTask = async (req: Request, res: Response) => {
    try {
        const upadeTask = await prisma.task.updateMany({
            where: {
                id: req.params.id,
                userId: req.body.userId,
            },

            data: {
                title: req.body.title,
                isCompleted: req.body.isCompleted,
            },
        });
        if (upadeTask.count == 0) {
            res.json("no recoder was updated");
        } else {
            res.status(200).json({ msg: "The Task has been Updated", upadeTask });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const deleteTask = await prisma.task.deleteMany({
            where: {
                id:req.params.id,
                userId:res.locals.user.id
            },
        });
        console.log(deleteTask);
        
        if (!deleteTask) {
            res.json("no recoder was deleted");
        } else {
            res.status(200).json({ msg: "The Task has been deleted", deleteTask });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
