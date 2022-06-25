import missionRepository from "../repository/missionRepository.js";
import dbHandler from "../repository/index.js";
import notFound from "./not-found.js";
import defaultHeader from "../helpers/defaultHeader.js";

class MissionController {
    static getMissions = async (_) => {
        try {
            const missions = await dbHandler(missionRepository.getMissions);
            return {
                defaultHeader,
                statusCode: 200,
                body: { missions }
            }
        } catch (e) {
            console.log(e)
            return {
                defaultHeader,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
    static getMissionById = async (httpRequest) => {
        try {
            const mission = await dbHandler(missionRepository.getMissionById,
                httpRequest.body,
                httpRequest.params
            );
            if (!mission) {
                return notFound();
            }
            return {
                defaultHeader,
                statusCode: 200,
                body: mission
            }
        } catch (e) {
            console.log(e)
            return {
                defaultHeader,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }

    static addMission = async (httpRequest) => {
        try {
            const success = await dbHandler(missionRepository.addMission, httpRequest.body);
            return {
                defaultHeader,
                statusCode: 201,
                body: { success }
            }
        } catch (e) {
            console.log(e)
            return {
                defaultHeader,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }

    static deleteMission = async (httpRequest) => {
        try {
            const success = await dbHandler(
                missionRepository.deleteMission,
                httpRequest.body,
                httpRequest.params,
                httpRequest.query
            );
            return {
                defaultHeader,
                statusCode: 200,
                body: { success }
            }
        } catch (e) {
            console.log(e)
            return {
                defaultHeader,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}

export default MissionController;