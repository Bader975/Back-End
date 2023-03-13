import express from "express";
import { UpdateUser, Login, createUser,  getUserByID } from "../controller/user.controller";
import { validate } from "../middleware/validate";
import { userVaild, userlogin } from "../zod.schema/user.zod";
import { protect, authorize } from "../middleware/auth";

let router = express.Router();


router.get('/',protect,authorize('User'), getUserByID)
router.post('/',createUser)
router.post('/login', Login)
router.put('/',protect,authorize('User'),UpdateUser)









export default router;