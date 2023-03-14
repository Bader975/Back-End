import {getAllCamp,countAllCamp}from "../controller/adminUser"
import { protect, authorize } from "../middleware/auth";
import express from "express";


let router = express.Router();

router.get('/',getAllCamp)
router.get('/countAll',countAllCamp)







export default router;