import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
import { Request, Response } from "express";

// add new profile
export const createProfile = async (req: Request, res: Response) => {
    try {
        let data=req.body
        let newProfile=await prisma.profile.create({
            data:data
        })
        res.json({
            message:'تم انشاء الملف الشخصي',
            newProfile
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
//update profile
export const UpdateProfile = async (req: Request, res: Response) => {
    try {
        let data=req.body
        let profile=await prisma.profile.updateMany({
            where:{
                id:req.params.id,
                // id:res.locals.user.id,
                userID:res.locals.user.id
            },
            data:data
        })
        res.status(200).json({
            message:'تم تحديث الملف الشخصي',
            // profile
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

//delete profile
export const deleteProfile = async (req: Request, res: Response) => {
    try {
        let profile=await prisma.profile.deleteMany({
            where:{
                id:req.params.id,
                userID:res.locals.user.id
            },
          
        })
        res.json({
            message:'تم حذف الملف الشخصي',
            profile
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
// get all profile 
export const getAllprofile = async (req: Request, res: Response) => {
    try {
        
        let profile=await prisma.profile.findMany()
        res.json({
            profile
        })
        
    } catch (error) {
        console.log(error);
        
    }

}
// get all profile for user 
export const getProfiletByID = async (req: Request, res: Response) => {
    try {
        
        let profile=await prisma.profile.findFirst({
            where:{
                // userID:res.locals.id
                userID:res.locals.user.id        
                },
            select:{
                aboutMy:true,
                skill:true,
                img:true,
                twitterURL:true,

                user:{
                    select:{
                        email:true,
                        phone_number:true,
                        name:true
                       
                    }
                }
            }
            
        })
        res.json({
            profile
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

export const getProfile = async (req: Request, res: Response) => {
    try {
        console.log("hh");
        
        let profile=await prisma.profile.findFirst({
            where:{
                id:req.params.id
            },
            select:{
                aboutMy:true,
                skill:true,
                twitterURL:true,
                user:{
                    select:{
                        email:true,
                        name:true
                    }
                }
            }
        })
        res.json({
            profile
        })
        
    } catch (error) {
        console.log(error);
        
    }

}