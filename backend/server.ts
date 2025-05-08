import app from "./src/app"
import {connectToMongoDB} from "./src/db/db"
const PORT = 3000

const startServer = async()=>{
    await connectToMongoDB()
    app.listen(PORT,()=>{
        console.log(`Running on http://localhost:${PORT}`);
        
    })
}
startServer()