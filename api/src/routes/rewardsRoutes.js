import express from "express";
import makeExpressCallback from "../helpers/expressCallback.js";
import RewardController from "../controllers/rewardsController.js";

const router = express.Router();


router
    .get("/rewards", makeExpressCallback(RewardController.getRewards))
    .get("/rewards/:id", makeExpressCallback(RewardController.getRewardById))
    .post("/rewards", makeExpressCallback(RewardController.addReward))
    .delete("/rewards/:id", makeExpressCallback(RewardController.deleteReward))

export default router;