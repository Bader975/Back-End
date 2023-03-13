import {getAllCamp}from "../controller/adminUser"
import { protect, authorize } from "../middleware/auth";
import express from "express";


let router = express.Router();

router.get('/',getAllCamp)







export default router;