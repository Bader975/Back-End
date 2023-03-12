import express from "express";
import { UpdateUser, Login, createUser,  getUserByID } from "../controller/user.controller";
import { validate } from "../middleware/validate";
import { userVaild, userlogin } from "../zod.schema/user.zod";
import auth from "../middleware/auth";

let router = express.Router();


router.get('/',auth, getUserByID)
router.post('/',auth,validate(userVaild),createUser)
router.post('/login', Login)
router.put('/',auth,validate(userVaild),UpdateUser)









export default router;