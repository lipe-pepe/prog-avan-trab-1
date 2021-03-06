import UserRepository from "../repository/userRepository.js";
import MissionRepository from "../repository/missionRepository.js";
import RewardRepository from "../repository/rewardRepository.js";
import dbHandler from "../repository/index.js";
import notFound from "./not-found.js";
import defaultHeader from "../helpers/defaultHeader.js";

class UserController {
    static getUsers = async (_) => {
        try {
            const users = await dbHandler(UserRepository.getUsers);
            return {
                defaultHeader,
                statusCode: 200,
                body: { users }
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

    static getUserById = async (httpRequest) => {
        try {
            const user = await dbHandler(UserRepository.getUserById,
                httpRequest.body,
                httpRequest.params
            );
            if (!user) {
                return notFound();
            }
            return {
                defaultHeader,
                statusCode: 200,
                body: user
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

    static addUser = async (httpRequest) => {
        try {
            const success = await dbHandler(UserRepository.addUser, httpRequest.body);
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

    static deleteUser = async (httpRequest) => {
        try {
            const success = await dbHandler(
                UserRepository.deleteUser,
                httpRequest.body,
                httpRequest.params
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

    static activateMission = async (httpRequest) => {
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
                defaultHeader,
                statusCode: 200,
                body: { status: missionResult && userResult }
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

    static completeMission = async (httpRequest) => {
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

            const missionResult = await dbHandler(MissionRepository.completeMission,
                mission,
                { userId: httpRequest.params.id }
            );

            const userResult = await dbHandler(UserRepository.completeMission,
                user,
                {
                    missionId: httpRequest.params.missionId,
                    missionPoints: mission.points
                }
            );

            return {
                defaultHeader,
                statusCode: 200,
                body: { status: missionResult && userResult }
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

    static requestReward = async (httpRequest) => {
        try {
            const user = await dbHandler(UserRepository.getUserById,
                httpRequest.body,
                { id: httpRequest.params.id }
            );
            if (!user) {
                return notFound();
            }
            const reward = await dbHandler(RewardRepository.getRewardById,
                httpRequest.body,
                { id: httpRequest.params.rewardId }
            );
            if (!reward) {
                return notFound();
            }

            const rewardResult = await dbHandler(RewardRepository.userClaimReward,
                reward,
                { userId: httpRequest.params.id }
            );

            const userResult = await dbHandler(UserRepository.requestReward,
                user,
                {
                    rewardId: httpRequest.params.rewardId,
                    rewardPrice: reward.price
                }
            );

            return {
                defaultHeader,
                statusCode: 200,
                body: { status: rewardResult && userResult }
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

    static completeReward = async (httpRequest) => {
        try {
            const user = await dbHandler(UserRepository.getUserById,
                httpRequest.body,
                { id: httpRequest.params.id }
            );
            if (!user) {
                return notFound();
            }
            const reward = await dbHandler(RewardRepository.getRewardById,
                httpRequest.body,
                { id: httpRequest.params.rewardId }
            );
            if (!reward) {
                return notFound();
            }

            const rewardResult = await dbHandler(RewardRepository.handOutReward,
                reward,
                { userId: httpRequest.params.id }
            );

            const userResult = await dbHandler(UserRepository.completeReward,
                user,
                { rewardId: httpRequest.params.rewardId }
            );

            return {
                defaultHeader,
                statusCode: 200,
                body: { status: rewardResult && userResult }
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

export default UserController;