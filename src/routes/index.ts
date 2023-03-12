import {Router} from 'express'
import userRoter  from './user.route'
import projectRoute  from './project.route'
import profileRoute  from './project.route'
 
const router = Router()


router.use('/user',userRoter)
router.use('/project',projectRoute)
router.use('/profile',profileRoute)





export default router;