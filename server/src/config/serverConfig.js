import dotENV from 'dotenv';

dotENV.config()

const serverConfig = (server) =>{
    const startServer = ()=>{
        const port = parseInt(process.env.PORT,10)
        server.listen(port ,'0.0.0.0', ()=>{
            console.log(`Server started on http://localhost:${process.env.PORT}`);
        })
    }
    return startServer()
}
export default serverConfig;