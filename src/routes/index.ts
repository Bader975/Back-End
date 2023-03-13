import {Router} from 'express'
import userRoter  from './user.route'
import projectRoute  from './project.route'
import profileRoute  from './project.route'
import adminRoute  from './admin.route'
import campRoute  from './camp.route'
import ideaRoute  from './idea.route'

const router = Router()

router.use('/user',userRoter)
router.use('/project',projectRoute)
router.use('/profile',profileRoute)
router.use('/admin',adminRoute)
router.use('/camp',campRoute)
router.use('/idea',ideaRoute)



export default router;