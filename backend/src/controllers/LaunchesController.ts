import Launch from "../models/Launch"
import {Request, Response} from "express"

// only solution i found for returning data is to  use 'any' instead of Response inside of Promise, there is also another solution with 'void type'
export const getLaunches = async (req: Request, res: Response): Promise<any> => {
    try {
        const Launches = await Launch.find()
        // we are checking if any launch exists
        if (!Launches.length) {
            return res.status(400).json({"message": "No launches found"})
        }
        return res.status(200).json({"launches": Launches})
    } catch (err) {
        return res.status(500).json({"message": err})
    }
}

export const getLaunchById = async (req: Request, res: Response): Promise<any> => {
    try {
        const LaunchId = req.params.id
        const launch = await Launch.findById(LaunchId)
        
        if (!launch) {
            return res.status(404).json({"message": "Launch not found"})
        }
        
        return res.status(200).json({launch})
    } catch (err) {
        return res.status(500).json({"message": err})
    }
}

export const createLaunch = async (req: Request, res: Response): Promise<any> => {
    try {
        const newLaunch = req.body
        const sameLaunchExists =await Launch.findOne({flight_number:newLaunch.flight_number})
        if(!sameLaunchExists){
            await Launch.create(newLaunch)
            return res.status(201).json({"message": "Successfully created new launch"})
        }
        return res.status(400).json({"message":"Launch with that flight_number already exists"})
    } catch (err) {
        return res.status(500).json({"message": err})
    }
}

export const updateLaunch = async (req: Request, res: Response): Promise<any> => {
    try {
        const LaunchId = req.params.id
        const updatedLaunch = req.body
        
        const launch = await Launch.findByIdAndUpdate(LaunchId, updatedLaunch)
        
        if (!launch) {
            return res.status(404).json({"message": "Launch not found"})
        }
        
        return res.status(200).json({"message": "Successfully updated launch"})
    } catch (err) {
        return res.status(500).json({"message": err})
    }
}

export const deleteLaunch = async (req: Request, res: Response): Promise<any> => {
    try {
        const deleteLaunchId = req.params.id
        
        const launch = await Launch.findByIdAndDelete(deleteLaunchId)
        
        if (!launch) {
            return res.status(404).json({"message": "Launch not found"})
        }
        
        return res.status(200).json({"message": "Successfully deleted launch"})
    } catch (err) {
        return res.status(500).json({"message": err})
    }
}