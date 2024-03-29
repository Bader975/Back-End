import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
import { Request, Response } from "express";

// add new Idea
export const createIdea = async (req: Request, res: Response) => {
    try {
        
        let Idea=await prisma.idea.create({
            data:{
                title:req.body.title,
                discription:req.body.discription,
                userID:res.locals.user.id
            },
            select:{
                id:true,
                title:true,
                discription:true
            }
            
        })
        res.json({
            message:'تم انشاء الفكرة ',
            Idea
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

//update Idea
export const UpdateIdea = async (req: Request, res: Response) => {
    try {
        
        let Project=await prisma.idea.updateMany({
            where:{
                id:req.params.id,
                userID:res.locals.user.id
            },
            data:{
                title:req.body.title,
                discription:req.body.discription,
                userID:res.locals.user.id
            }
        })
        res.json({
            message:'تم تحديث الفكرة بنجاح',
            Project
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

//delete prpject
export const deleteIdea = async (req: Request, res: Response) => {
    try {
        let Idea=await prisma.idea.deleteMany({
            where:{
                id:req.params.id,
                userID:res.locals.user.id
            },
          
        })
        res.json({
            message:'تم حذف الفكرة بنجاح',
            Idea
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

// get all Idea 
export const getAllIdea = async (req: Request, res: Response) => {
    try {
        
        let Idea=await prisma.idea.findMany({
            select:{
                id:true,
                title:true,
                discription:true,
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })
        res.json({
            Idea
        })
        
    } catch (error) {
        console.log(error);
        
    }

}


// get all project for user 
export const getAllIdeaByID = async (req: Request, res: Response) => {
    try {
        
        let Idea=await prisma.idea.findMany({
            where:{
                userID:res.locals.user.id
            }
        })
        res.json({
            Idea
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

export const getIdeaByID = async (req: Request, res: Response) => {
    try {
        
        let Idea=await prisma.idea.findMany({
            where:{
                id:req.params.id
            }
        })  
        res.json({
            Idea
        })
        
    } catch (error) {
        console.log(error);
        
    }

}