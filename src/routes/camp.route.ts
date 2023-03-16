import {getAllCamp,countAllCamp,GetcampByID}from "../controller/adminUser"
import { protect, authorize } from "../middleware/auth";
import express from "express";


let router = express.Router();

router.get('/',getAllCamp)
router.get('/countAll',countAllCamp)
router.get('/:id',GetcampByID)







export default router;