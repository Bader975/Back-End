import express from "express";
import{createProject,UpdateProject,deleteProject,getAllProject,getAllProjectByID,countAllProject}from "../controller/project.controller"
import { validate } from "../middleware/validate";
import { projectVaild } from "../zod.schema/project.zod ";
import { protect, authorize } from "../middleware/auth";
import {getAllCamp}from "../controller/adminUser"
let router = express.Router();



router.get('/all', getAllProject)
router.get('/',protect,authorize('User'),getAllProjectByID)
router.post('/',validate(projectVaild),protect,authorize('User'),createProject)
router.put('/:id',validate(projectVaild),protect,authorize('User'), UpdateProject)
router.delete('/:id',protect,authorize('User'), deleteProject)
router.get('/countAll',countAllProject)






export default router;