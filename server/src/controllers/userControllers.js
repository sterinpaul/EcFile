import userHelpers from '../helpers/userHelpers.js'
import authService from '../middleware/auth.js'
import nodemailer from 'nodemailer'


const userControllers = {
    signup: async (req, res) => {
        const { ...userData } = req.body
        const userExists = await userHelpers.searchUser(userData.email, userData.mobile)
        if (userExists) {
            res.json({ status: false })
        } else {
            const hashedpassword = await authService.encryptPassword(userData.password)
            userData.password = hashedpassword
            const profilePic = req.file?.path?.split('/image-')[1]
            const response = await userHelpers.signup(userData, profilePic)
            if (response) {
                
                const verificationToken = await authService.generateToken(response._id)

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "sterinalternate@gmail.com",
                        pass: "npkg qkco mkok zfxz",
                    },
                });

                // async..await is not allowed in global scope, must use a wrapper
                async function main() {
                    // send mail with defined transport object
                    const info = await transporter.sendMail({
                        from: '"EcFile 👻" <sterinalternate@gmail.com>', // sender address
                        to: response.email, // list of receivers
                        subject: `Hello ${response.fullName}`, // Subject line
                        text: "Please verify your E-mail ?", // plain text body
                        html: `<b><a href="http://${req.headers.host}/api/user/auth/${verificationToken}">Click here to verify your email</a></b>`, // html body
                        // html: `<b><a href="http://localhost:5173/auth/${verificationToken}">Click here to verify your email</a></b>`, // html body
                    });

                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    //
                    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
                    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
                    //       <https://github.com/forwardemail/preview-email>
                    //
                }

                main().catch(console.error);
                res.json({ status: true })
            }
        }
    },
    verifyTokenFromMail:async(req,res)=>{
        const token = req.params.token
        const status = await authService.verifyToken(token)
        if(status){
            await userHelpers.userStatusChange(status)
            res.send('Email verified. <a href="http://localhost:5173/">Click here to login</a>')
        }
    },
    login: async(req, res) => {
        const {mobile,password} = req.body
        const userExists = await userHelpers.getUser(mobile)
        if(userExists){
            if(userExists.isValid){
                const response = await authService.comparePassword(password,userExists.password)
                if(response){
                    userExists.password = ''
                    const token = await authService.generateToken(userExists._id)
                    res.json({status:true,message:'Login success',data:userExists,token})
                }else{
                    res.json({status:false,message:'Password incorrect'})
                }
            }else{
                res.json({status:false,message:'Please verify your E-mail'})
            }
        }else{
            res.json({status:false,message:'User does not exists'})
        }
    },
    getUser:async(req,res)=>{
        const userId = req.params.userId
        const response = await userHelpers.getUserWithId(userId)
        if(response){
            res.json(response)
        }
    }
}

export default userControllers