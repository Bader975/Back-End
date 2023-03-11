import express from "express";

import { createTask, deleteTask, getUserTask, updateTask } from "../controller/task.conroller";
import { validate } from "../middleware/validate";

import { taskVaild } from "../zod.schema/task.zod ";
import auth from "../middleware/auth";

let router = express.Router();



router.get('/task',auth, getUserTask)
router.post('/task',auth,createTask)
router.put('/task/', updateTask)
router.delete('/task/:id', deleteTask)






export default router;