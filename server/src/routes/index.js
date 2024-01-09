import userRouter from "./userRouter.js";
import adminRouter from "./adminRouter.js";

const routes = (app)=>{
    app.use('/api/user',userRouter())
    app.use('/api/admin',adminRouter())
}

export default routes