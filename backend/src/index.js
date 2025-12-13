import dotenv from "dotenv"  
import { app } from "./app.js";
import connectDB from "./db/index.js";
import unlockCapsulesJob from "./jobs/unlockCapsules.job.js";
dotenv.config({
    path: './env'   
})

connectDB()
.then(()=>{

    app.listen(process.env.PORT || 8000,()=>{  
        console.log(`Server is runnning at port : ${process.env.PORT}`);
        unlockCapsulesJob();
    })
})
.catch((err)=>{
    console.log("mongodb connection failed !!!" , err);
    
})