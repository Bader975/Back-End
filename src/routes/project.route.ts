import express from "express";
import{createProject,UpdateProject,deleteProject,getAllProject,getAllProjectByID}from "../controller/project.controller"
import { validate } from "../middleware/validate";
import { taskVaild } from "../zod.schema/task.zod ";
import auth from "../middleware/auth";

let router = express.Router();



router.get('/', getAllProject)
router.get('/',auth,getAllProjectByID)
router.post('/',auth,createProject)
router.put('/:id', UpdateProject)
router.delete('/:id', deleteProject)






export default router;