import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
import { Request, Response } from "express";

// add new project
export const createProject = async (req: Request, res: Response) => {
    try {
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
            message:'تم انشاء المشروع بنجاح',
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
            message:'تم تحديث المشروع',
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
export const getProject = async (req: Request, res: Response) => {
    try {
        let Project=await prisma.project.findMany({
            where:{
                id:req.params.id,
            },select:{
                title:true,
                discription:true,
                nameOfCamp:true,
                projectURL:true,
                img:true,
                user:{
                    select:{
                        name:true,
                      
                    }
                }
            }
        })
        console.log(Project);
        
        res.json({
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getTheUserProject = async (req: Request, res: Response) => {
    try {
        let Project=await prisma.project.findMany({
            where:{
                user:{
                    id:req.params.id
                }
            },select:{
                id:true,
                title:true,
                discription:true,
                nameOfCamp:true,
                projectURL:true,
                img:true,
                user:{
                    select:{
                        name:true,
                      
                    }
                }
            }
        })
        console.log(Project);
        
        res.json({
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
            message:'تم حذف المشروع',
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

// get all project 
export const getAllProject = async (req: Request, res: Response) => {
    try {
        
        let Project=await prisma.project.findMany({
            select:{
                id:true,
                title:true,
                discription:true,
                img:true,
                nameOfCamp:true,
                user:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })
        res.json({
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

// get all project 
export const get3Project = async (req: Request, res: Response) => {
    try {
        
        let Project=await prisma.project.findMany({
           take:3,
            select:{
                id:true,
                title:true,
                discription:true,
                img:true,
                nameOfCamp:true,
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })
        res.json({
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

// get all project 
export const getProjectByID = async (req: Request, res: Response) => {
    try {
        
        let Project=await prisma.project.findMany({
            where:{
                id:req.params.id
            },
            select:{
                title:true,
                discription:true,
                img:true,
                nameOfCamp:true,
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })
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
                userID:res.locals.user.id
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
        
        let projects=await prisma.project.count({
        })
        res.json({
            projects
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

