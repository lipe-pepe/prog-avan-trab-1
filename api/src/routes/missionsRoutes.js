import express from "express";
import makeExpressCallback from "../helpers/expressCallback.js";
import MissionController from "../controllers/missionsController.js";

const router = express.Router();


router
    .get("/missions", makeExpressCallback(MissionController.getMissions))

export default router;