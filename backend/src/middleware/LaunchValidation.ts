import { NextFunction, Request,Response } from "express"
export const LaunchValidation=(req:Request,res:Response,next:NextFunction):void=>{
    const{name,flight_number,date_utc} = req.body
    if(!name || !flight_number || !date_utc){
        res.status(400).json({"message":"Name, flight number and date are required"})
        return
    } 
    next()
}