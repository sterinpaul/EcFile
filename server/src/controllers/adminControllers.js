import adminHelpers from '../helpers/adminHelpers.js'
import authService from '../middleware/auth.js'

const adminControllers = {
    getDashBoard:async(req,res)=>{
        const response = await adminHelpers.getDashBoard()
        if(response) res.json(response)
    },
    adminLogin:async(req,res)=>{
        const {email,password} = req.body
        const adminExists = await adminHelpers.adminLogin(email)
        if(adminExists){
            const response = await authService.comparePassword(password,adminExists.password)
            if(response){
                adminExists.password = ''
                const adminToken = await authService.generateToken(adminExists._id)
                res.json({status:true,message:'Login success',adminToken})
            }else{
                res.json({status:false,message:'Password incorrect'})
            }
        }else{
            res.json({status:false,message:'Admin does not exists'})
        }
    }
}

export default adminControllers