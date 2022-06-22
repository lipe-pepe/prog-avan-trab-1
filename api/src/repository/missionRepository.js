import Mission from "../repository/models/Mission.js";
import makeDb from "../config/dbConnect.js";

class MissionRepository {
    static handler = async (operation, body, params, query) => {
        await makeDb();
        let result = await operation(body, params, query);
        return result;
    }

    static getMissions = async () => {
        let missions = await Mission.find();
        return missions;
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
}

export default MissionRepository;