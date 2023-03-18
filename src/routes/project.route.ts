import express from "express";
import{createProject,UpdateProject,deleteProject,getAllProject,getAllProjectByID,countAllProject,get3Project,getProject,getTheUserProject}from "../controller/project.controller"
import { validate } from "../middleware/validate";
import { projectVaild } from "../zod.schema/project.zod ";
import { protect, authorize } from "../middleware/auth";
import {getAllCamp}from "../controller/adminUser"
let router = express.Router();



router.get('/all', getAllProject)
router.get('/userProject', getTheUserProject)
router.get('/last3', get3Project)
router.get('/:id', getProject)      
router.get('/',protect,authorize('User'),getAllProjectByID)
router.post('/',protect,authorize('User'),createProject)
router.put('/:id',protect,authorize('User'), UpdateProject)
router.delete('/:id',protect,authorize('User'), deleteProject)
router.get('/countAll',countAllProject)






export default router;