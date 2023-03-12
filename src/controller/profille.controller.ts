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
            msg:'profile created',
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
                userID:res.locals.user.id
            },
            data:data
        })
        res.json({
            msg:'profile updated',
            profile
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
            msg:'profile Deleted',
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
        
        let profile=await prisma.profile.findMany({
            where:{
                userID:res.locals.id
            }
        })
        res.json({
            profile
        })
        
    } catch (error) {
        console.log(error);
        
    }

}