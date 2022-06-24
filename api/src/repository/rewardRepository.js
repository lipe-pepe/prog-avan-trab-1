import mongoose from "mongoose";
import Reward from "./models/Reward.js";

class RewardRepository {
    static getRewards = async () => {
        let rewards = await Reward.find();
        return rewards;
    }

    static getRewardById = async (_, params) => {
        let reward = await Reward.findById(params.id);
        return reward;
    }

    static addReward = async (body) => {
        let reward = Reward(body);
        await reward.save();
        return true;
    }

    static deleteReward = async (_, params) => {
        let reward = await Reward.findById(params.id);
        if (!reward) {
            throw Error(`Reward doesn't exist`);
        }
        await reward.delete();
        return true;
    }

    static userClaimReward = async (body, params) => {
        let reward = Reward(body);
        let objectId = mongoose.Types.ObjectId.createFromHexString(params.userId);
        if (reward.claimers.includes(objectId)) {
            throw Error(`User already claimed this reward`);
        }
        if (reward.handed.includes(objectId)) {
            throw Error(`Reward already handed to this user`);
        }
        if (reward.availability < 1) {
            throw Error(`Reward unavailable`);
        }
        reward.claimers.push(objectId);
        await reward.updateOne({
            claimers: reward.claimers,
            availability: reward.availability - 1
        });
        return true;
    }

    static handOutReward = async (body, params) => {
        let reward = Reward(body);
        let objectId = mongoose.Types.ObjectId.createFromHexString(params.userId);
        if (reward.handed.includes(objectId)) {
            throw Error(`Reward already handed to this user`);
        }
        if (!reward.claimers.includes(objectId)) {
            throw Error(`User did not claim this reward`);
        }
        reward.claimers.splice(reward.claimers.findIndex(id => id == objectId), 1);
        reward.handed.push(objectId);
        await reward.updateOne({ claimers: reward.claimers, handed: reward.handed });
        return true;
    }
}

export default RewardRepository;