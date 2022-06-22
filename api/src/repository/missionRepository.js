import mongoose from "mongoose";
import Mission from "../repository/models/Mission.js";

class MissionRepository {
    static getMissions = async () => {
        let missions = await Mission.find();
        return missions;
    }

    static getMissionById = async (_, params) => {
        let mission = await Mission.findById(params.id);
        return mission;
    }

    static addMission = async (body) => {
        let mission = Mission(body);
        if ((await Mission.find({ formUrl: mission.formUrl })).length > 0) {
            throw Error(`There's already a mission created with the given form Url: ${mission.formUrl}`);
        }
        await mission.save();
        return true;
    }

    static deleteMission = async (_, params, query) => {
        let mission = await Mission.findById(params.id);
        if (!mission) {
            throw Error(`Mission doesn't exist`);
        }
        if (mission.createdBy.toString() != query.userId) {
            throw Error(`Not authorized to delete this mission`);
        }
        await mission.delete();
        return true;
    }

    static subscribeUserOnMission = async (body, params) => {
        let mission = Mission(body);
        let objectId = mongoose.Types.ObjectId.createFromHexString(params.userId);
        if (mission.participants.includes(objectId)) {
            throw Error(`User already participating on this mission`);
        }
        mission.participants.push(objectId);
        await mission.updateOne({participants: mission.participants});
        return true;
    }
}

export default MissionRepository;