import express from "express";
import { UpdateUser, Login, createUser,  getUserByID,countAlluser,getAlluser } from "../controller/user.controller";
import { validate } from "../middleware/validate";
import { userVaild, userlogin } from "../zod.schema/user.zod";
import { protect, authorize } from "../middleware/auth";

let router = express.Router();


router.get('/',protect,authorize('User'), getUserByID)
router.post('/',validate(userVaild),createUser)
router.post('/login',validate(userlogin), Login)
router.put('/',protect,authorize('User'),UpdateUser)
router.get('/countAll',countAlluser)
router.get('/all', getAlluser)










export default router;