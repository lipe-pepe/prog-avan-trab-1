import UserRepository from "../repository/userRepository.js";
import MissionRepository from "../repository/missionRepository.js";
import dbHandler from "../repository/index.js";
import notFound from "./not-found.js";

class UserController {
    static getUsers = async (_) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const users = await dbHandler(UserRepository.getUsers);
            return {
                headers,
                statusCode: 200,
                body: { users }
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

    static getUserById = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const user = await dbHandler(UserRepository.getUserById,
                httpRequest.body,
                httpRequest.params
            );
            if (!user) {
                return notFound();
            }
            return {
                headers,
                statusCode: 200,
                body: user
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

    static addUser = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const success = await dbHandler(UserRepository.addUser, httpRequest.body);
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

    static deleteUser = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const success = await dbHandler(
                UserRepository.deleteUser,
                httpRequest.body,
                httpRequest.params
            );
            return {
                headers,
                statusCode: 200,
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

    static activateMission = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const user = await dbHandler(UserRepository.getUserById,
                httpRequest.body,
                { id: httpRequest.params.id }
            );
            if (!user) {
                return notFound();
            }
            const mission = await dbHandler(MissionRepository.getMissionById,
                httpRequest.body,
                { id: httpRequest.params.missionId }
            );
            if (!mission) {
                return notFound();
            }

            const missionResult = await dbHandler(MissionRepository.subscribeUserOnMission,
                mission,
                { userId: httpRequest.params.id }
            );

            const userResult = await dbHandler(UserRepository.subscribeOnMission,
                user,
                { missionId: httpRequest.params.missionId }
            );

            return {
                headers,
                statusCode: 200,
                body: {status : missionResult && userResult}
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

export default UserController;