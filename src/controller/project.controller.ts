import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
import { Request, Response } from "express";

// add new project
export const createProject = async (req: Request, res: Response) => {
    try {
        let data=req.body
        let newProject=await prisma.project.create({
            data:{
                
                    title:req.body.title,
                    nameOfCamp:req.body.nameOfCamp,
                    discription:req.body.discription,
                    projectURL:req.body.projectURL,
                    img:req.body.img,
                    userID:res.locals.user.id
                
            }
        })
        res.json({
            msg:'project created',
            newProject
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

//update project
export const UpdateProject = async (req: Request, res: Response) => {
    try {
        let data=req.body
        let Project=await prisma.project.updateMany({
            where:{
                id:req.params.id,
                userID:res.locals.user.id
            },
            data:data
        })
        res.json({
            msg:'project updated',
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

//delete prpject
export const deleteProject = async (req: Request, res: Response) => {
    try {
        let data=req.body
        let Project=await prisma.project.deleteMany({
            where:{
                id:req.params.id,
                userID:res.locals.user.id
            },
          
        })
        res.json({
            msg:'project Deleted',
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

// get all project 
export const getAllProject = async (req: Request, res: Response) => {
    try {
        
        let Project=await prisma.project.findMany()
        res.json({
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }

}


// get all project for user 
export const getAllProjectByID = async (req: Request, res: Response) => {
    try {
        
        let Project=await prisma.project.findMany({
            where:{
                userID:res.locals.id
            }
        })
        res.json({
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

export const countAllProject = async (req: Request, res: Response) => {
    try {
        
        let numOfproject=await prisma.project.count()
        res.json({
            numOfproject
        })
        
    } catch (error) {
        console.log(error);
        
    }

}