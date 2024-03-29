import express from "express";
import {createProfile,UpdateProfile,deleteProfile,getProfiletByID,getProfile} from "../controller/profille.controller"
import { validate } from "../middleware/validate";
import { protect, authorize }from "../middleware/auth";

let router = express.Router();


router.get('/',protect,authorize('User'),getProfiletByID)
router.post('/',protect,authorize('User'),createProfile)
// router.put('/:id',protect,authorize('User'),UpdateProfile)
router.put('/',protect,authorize('User'),UpdateProfile)
router.delete('/:id',protect,authorize('User'),deleteProfile)
router.get('/:id',getProfile)





export default router