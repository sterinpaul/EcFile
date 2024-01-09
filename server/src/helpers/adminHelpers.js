import Admin from "../model/adminModel.js"
import User from "../model/userModel.js"

const adminHelpers = {
    getDashBoard:async()=>{
        return await User.find().sort({createdAt:-1})
    },
    adminLogin:async(email)=>{
        const response = await Admin.findOne({email})
        if(response){
            return response
        }
    }
}

export default adminHelpers