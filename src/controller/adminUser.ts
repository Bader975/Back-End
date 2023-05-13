import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
import { Request, Response } from "express";


export const createCamp = async (req: Request, res: Response) => {
    try {
        let data = req.body
        let Camp = await prisma.camp.create({
            data: data
        })
        res.json({
            message: 'تم انشاء المعسكر',
            Camp
        })

    } catch (error) {
        res.status(500).json({ message: "خطاء في النظام " })
        console.log(error);

    }
}

export const UpdateCamp = async (req: Request, res: Response) => {
    try {
        let data = req.body
        let Camp = await prisma.camp.updateMany({
            where: {
                id: req.params.id,

            },
            data: data
        })
        res.json({
            message: 'تم تحديث المعسكر',

            Camp
        })

    } catch (error) {
        console.log(error);

    }
}
export const deleteCamp = async (req: Request, res: Response) => {
    try {

        let Camp = await prisma.camp.delete({
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: 'تم حذف المعسكر',
            Camp
        })

    } catch (error) {
        console.log(error);

    }
}
export const getAllCamp = async (req: Request, res: Response) => {
    try {

        let Camp = await prisma.camp.findMany()
        res.json({
            Camp
        })

    } catch (error) {
        console.log(error);

    }

}
export const deleteProject = async (req: Request, res: Response) => {
    try {

        let Project = await prisma.project.deleteMany({
            where: {
                id: req.params.id,
            },

        })
        res.json({
            message: 'تم حذف الشمروع',
            Project
        })

    } catch (error) {
        console.log(error);

    }
}
export const countAllCamp = async (req: Request, res: Response) => {
    try {

        let Camp = await prisma.camp.count()
        res.json({
            Camp
        })

    } catch (error) {
        console.log(error);

    }

}

export const GetcampByID = async (req: Request, res: Response) => {
    try {
        console.log('gg');

        let Camp = await prisma.camp.findFirst({
            where: {
                id: req.params.id
            }
        })
        console.log(Camp);

        res.json({

            Camp
        })

    } catch (error) {
        console.log(error);

    }

}