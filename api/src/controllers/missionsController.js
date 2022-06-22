import missionRepository from "../repository/missionRepository.js";

class MissionController {
    static getMissions = async (_) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const missions = await missionRepository.handler(missionRepository.getMissions);
            return {
                headers,
                statusCode: 200,
                body: { missions }
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

    static addMission = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const success = await missionRepository.handler(missionRepository.addMission, httpRequest.body);
            return {
                headers,
                statusCode: 201,
                body: { success }
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