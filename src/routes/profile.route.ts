import express from "express";
import {createProfile,UpdateProfile,deleteProfile,getProfiletByID} from "../controller/profille.controller"
import { validate } from "../middleware/validate";
import auth from "../middleware/auth";

let router = express.Router();


router.get('/',auth,getProfiletByID)
router.post('/',auth,createProfile)
router.put('/:id',auth,UpdateProfile)
router.delete('/:id',auth,deleteProfile)





export default router