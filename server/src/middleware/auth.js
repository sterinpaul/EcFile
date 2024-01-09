import bcrypt from 'bcryptjs';
import dotENV from 'dotenv';
import jwt from 'jsonwebtoken';
dotENV.config()

const authService = {
    encryptPassword : async(password)=>{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword
    },
    comparePassword : (password,hashedPassword)=>{
        return bcrypt.compare(password,hashedPassword)
    },
    generateToken : async(payload)=>{
        if(process.env.JWT_SECRET_KEY){
            const token = jwt.sign({payload},process.env.JWT_SECRET_KEY,{
                expiresIn:"2d"
            })
            return token
        }else{
            throw new Error("JWT Token is undefined");
        }
    },
    verifyToken : (token)=>{
        if(process.env.JWT_SECRET_KEY){
            const userData = jwt.verify(token,process.env.JWT_SECRET_KEY)
            if(userData.exp !== undefined){
                const currentTimeInSeconds = Math.floor(Date.now() / 1000)
                if(userData.exp >= currentTimeInSeconds){
                    return userData.payload
                }else{
                    return false
                }
            }
        }
        return undefined
    }
}
export default authService