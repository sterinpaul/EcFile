import express from 'express'
import adminControllers from '../controllers/adminControllers.js'

const adminRouter = ()=>{
    const router = express.Router()
    router.get('/',adminControllers.getDashBoard)
    router.post('/adminlogin',adminControllers.adminLogin)
    
    return router
}

export default adminRouter