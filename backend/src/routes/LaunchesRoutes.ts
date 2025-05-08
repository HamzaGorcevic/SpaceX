import express from "express";
import {
    getLaunches,
    getLaunchById,
    createLaunch,
    updateLaunch,
    deleteLaunch
  } from "../controllers/LaunchesController";
  const router = express.Router()

// get all travel cards
router.get("/",getLaunches)
// create travel card
router.post("/",createLaunch)
// update travel card by id
router.put("/update/:id",updateLaunch)
// delete travel card by id
router.delete("/delete/:id",deleteLaunch)
export default router