import { validate } from "../middleware/validate";
import {campVaild}from "../zod.schema/camp.zod"
import { protect, authorize }from "../middleware/auth";
import express from "express";
import {createCamp,UpdateCamp,deleteCamp,deleteProject}from "../controller/adminUser"
let router = express.Router();



router.post('/camp',protect,authorize('Admin'),createCamp)
// ,validate(campVaild)
router.put('/camp/:id',protect,authorize('Admin'),UpdateCamp)
router.delete('/camp/:id',protect,authorize('Admin'),deleteCamp)
router.delete('/project/:id',protect,authorize('Admin'),deleteProject)


export default router;