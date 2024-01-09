import express from 'express'
import userControllers from '../controllers/userControllers.js'
import {uploadProfilePic} from '../middleware/multer.js'
import authMiddleware from '../middleware/authToken.js'

const userRouter = ()=>{
    const router = express.Router()
    router.get('/:userId',authMiddleware,userControllers.getUser)
    router.post('/signup',uploadProfilePic,userControllers.signup)
    router.post('/login',userControllers.login)
    router.get('/auth/:token',userControllers.verifyTokenFromMail)
    return router
}

export default userRouter