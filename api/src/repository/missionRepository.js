import Mission from "../repository/models/Mission.js";
import makeDb from "../config/dbConnect.js";

class MissionRepository {
    static getMissions = async () => {
        await makeDb();
        let missions = await Mission.find();
        return missions;
    }

    static addMission = async (body) => {
        await makeDb();
        let mission = Mission(body);
        if ((await Mission.find({ formUrl: mission.formUrl })).length > 0) {
            throw Error(`There's already a mission created with the given form Url: ${mission.formUrl}`);
        }
        await mission.save();
        return true;
    }
}

export default MissionRepository;