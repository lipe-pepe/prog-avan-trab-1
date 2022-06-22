import missionRepository from "../repository/missionRepository.js";

class MissionController {
    static getMissions = async (_) => {
        const headers = {
          'Content-Type': 'application/json'
        }
        try {
          const missions = await missionRepository.getMissions();
          return {
            headers,
            statusCode: 200,
            body: missions
          }
        } catch (e) {
          console.log(e)
          return {
            headers,
            statusCode: 400,
            body: {
              error: e.message
            }
          }
        }
    }
}

export default MissionController;