import adminHelpers from '../helpers/adminHelpers.js'

const adminControllers = {
    getDashBoard:async(req,res)=>{
        const response = await adminHelpers.getDashBoard()
        if(response) res.json(response)
    },
    adminLogin:async(req,res)=>{
        const userData = req.body.userData
        const response = await adminHelpers.adminLogin(userData)
        if(response) res.json({status:true})
    }
}

export default adminControllers