import { validate } from "../middleware/validate";
import {ideatVaild}from "../zod.schema/idea.zod"
import { protect, authorize }from "../middleware/auth";
import express from "express";
import {createIdea,UpdateIdea,deleteIdea,getAllIdea,getAllIdeaByID}from "../controller/idea"
let router = express.Router();



router.post('/',validate(ideatVaild),protect,authorize('Company'),createIdea)
router.put('/:id',validate(ideatVaild),protect,authorize('Company'),UpdateIdea)
router.delete('/:id',protect,authorize('Company'),deleteIdea)
router.get('/',protect,authorize('Company'),getAllIdeaByID)
router.get('/all',getAllIdea)


export default router;