import express from "express";
import { Hello, Login, createUser,  getallUsers } from "../controller/user.controller";
import { validate } from "../middleware/validate";
import { userVaild, userlogin } from "../zod.schema/user.zod";
import auth from "../middleware/auth";

let router = express.Router();


router.get('/user', getallUsers)
router.post('/user/login', Login)

router.post('/user',validate(userVaild),createUser)






export default router;