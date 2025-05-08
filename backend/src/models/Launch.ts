import mongoose from "mongoose"

const Launch = new mongoose.Schema({
    flight_number:{type:String,required:true},
    name:{type:String,required:true},
    date_utc:{type:String,required:true}

})

export default mongoose.model('Launch',Launch)