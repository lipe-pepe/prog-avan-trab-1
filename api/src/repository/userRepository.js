import mongoose from "mongoose";
import User from "../repository/models/User.js";

class UserRepository {
    static getUsers = async () => {
        let users = await User.find();
        return users;
    }

    static getUserById = async (_, params) => {
        let user = await User.findById(params.id);
        return user;
    }

    static addUser = async (body) => {
        let user = User(body);
        if ((await User.find({ email: user.email })).length > 0) {
            throw Error(`There's already an user created with the given email: ${user.email}`);
        }
        await user.save();
        return true;
    }

    static deleteUser = async (_, params) => {
        let user = await User.findById(params.id);
        if (!user) {
            throw Error(`User doesn't exist`);
        }
        await user.delete();
        return true;
    }

    static subscribeOnMission = async (body, params) => {
        let user = User(body);
        let objectId = mongoose.Types.ObjectId.createFromHexString(params.missionId);
        if (user.activeMissions.includes(objectId)) {
            throw Error(`User already participating on this mission`);
        }
        if (user.completedMissions.includes(objectId)) {
            throw Error(`User already completed this mission`);
        }
        user.activeMissions.push(objectId);
        await user.updateOne({ activeMissions: user.activeMissions });
        return true;
    }

    static completeMission = async (body, params) => {
        let user = User(body);
        let objectId = mongoose.Types.ObjectId.createFromHexString(params.missionId);
        if (!user.activeMissions.includes(objectId)) {
            throw Error(`User is not participating on this mission`);
        }
        if (user.completedMissions.includes(objectId)) {
            throw Error(`User already completed this mission`);
        }
        user.activeMissions.splice(user.activeMissions.findIndex(id => id == objectId), 1);
        user.completedMissions.push(objectId);
        await user.updateOne({
            activeMissions: user.activeMissions,
            completedMissions: user.completedMissions,
            balance: user.balance + params.missionPoints,
            totalPoints: user.totalPoints + params.missionPoints
        });
        return true;
    }

    static requestReward = async (body, params) => {
        let user = User(body);
        let objectId = mongoose.Types.ObjectId.createFromHexString(params.rewardId);
        if (user.pendingRewards.includes(objectId)) {
            throw Error(`User already requested this reward`);
        }
        if (user.claimedRewards.includes(objectId)) {
            throw Error(`User already received this reward`);
        }
        if (user.balance < params.rewardPrice) {
            throw Error(`Insuficient balance`);
        }
        user.pendingRewards.push(objectId);
        await user.updateOne({
            pendingRewards: user.pendingRewards,
            balance: user.balance - params.rewardPrice
        });
        return true;
    }

    static completeReward = async (body, params) => {
        let user = User(body);
        let objectId = mongoose.Types.ObjectId.createFromHexString(params.rewardId);
        if (!user.pendingRewards.includes(objectId)) {
            throw Error(`User did not request this reward`);
        }
        if (user.claimedRewards.includes(objectId)) {
            throw Error(`User already claimed this reward`);
        }
        user.pendingRewards.splice(user.pendingRewards.findIndex(id => id == objectId), 1);
        user.claimedRewards.push(objectId);
        await user.updateOne({
            pendingRewards: user.pendingRewards,
            claimedRewards: user.claimedRewards
        });
        return true;
    }
}

export default UserRepository;