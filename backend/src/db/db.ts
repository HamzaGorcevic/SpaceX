import mongoose from "mongoose";

export const connectToMongoDB =async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING||"")
        console.log("Successfully connected");
        
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}