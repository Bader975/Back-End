import express from "express";
import{createProject,UpdateProject,deleteProject,getAllProject,getAllProjectByID}from "../controller/project.controller"
import { validate } from "../middleware/validate";
import { taskVaild } from "../zod.schema/task.zod ";
import { protect, authorize } from "../middleware/auth";
import {getAllCamp}from "../controller/adminUser"
let router = express.Router();



router.get('/all', getAllProject)
router.get('/',protect,authorize('User'),getAllProjectByID)
router.post('/',protect,authorize('User'),createProject)
router.put('/:id', UpdateProject)
router.delete('/:id', deleteProject)






export default router;