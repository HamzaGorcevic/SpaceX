import mongoose from "mongoose";

export const connectToMongoDB =async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/mern")
        console.log("Successfully connected");
        
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}