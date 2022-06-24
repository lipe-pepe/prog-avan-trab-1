import rewardRepository from "../repository/rewardRepository.js";
import dbHandler from "../repository/index.js";
import notFound from "./not-found.js";

class RewardController {
    static getRewards = async (_) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const rewards = await dbHandler(rewardRepository.getRewards);
            return {
                headers,
                statusCode: 200,
                body: { rewards }
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
    static getRewardById = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const reward = await dbHandler(rewardRepository.getRewardById,
                httpRequest.body,
                httpRequest.params
            );
            if (!reward) {
                return notFound();
            }
            return {
                headers,
                statusCode: 200,
                body: reward
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

    static addReward = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const success = await dbHandler(rewardRepository.addReward, httpRequest.body);
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

    static deleteReward = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const success = await dbHandler(
                rewardRepository.deleteReward,
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
}

export default RewardController;