import Mission from "../repository/models/Mission.js";
import makeDb from "../config/dbConnect.js";

class MissionRepository {
    static getMissions = async () => {
        await makeDb();
        let missions = await Mission.find();
        return { missions };
    }
}

export default MissionRepository;