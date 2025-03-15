import express from 'express'
import {getUser, updateUser} from '../controller/user.controller.js'
import verifyUser from '../miscellaneous/verifyUserMiddleware.js'

const router = express.Router()

router.get('/:id',verifyUser,getUser)
router.put('/update/:id',verifyUser,updateUser)

export default router