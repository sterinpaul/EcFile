import express from 'express'
import userControllers from '../controllers/userControllers.js'
import {uploadProfilePic} from '../middleware/multer.js'

const userRouter = ()=>{
    const router = express.Router()
    router.get('/:userId',userControllers.getUser)
    router.post('/signup',uploadProfilePic,userControllers.signup)
    router.post('/login',userControllers.login)
    router.get('/auth/:token',userControllers.verifyTokenFromMail)
    return router
}

export default userRouter