import Admin from "../model/adminModel.js"

const adminHelpers = {
    getDashBoard:async()=>{
        return await Admin.find()
    },
    adminLogin:async(adminData)=>{
        const response = await Admin.findOne({email:adminData.email})
        if(response){
            return response
        }
    }
}

export default adminHelpers