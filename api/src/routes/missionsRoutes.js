import express from "express";
import makeExpressCallback from "../helpers/expressCallback.js";
import MissionController from "../controllers/missionsController.js";

const router = express.Router();


router
    .get("/missions", makeExpressCallback(MissionController.getMissions))
    .get("/missions/:id", makeExpressCallback(MissionController.getMissionById))
    .post("/missions", makeExpressCallback(MissionController.addMission))
    .delete("/missions/:id", makeExpressCallback(MissionController.deleteMission))

export default router;