import rewardRepository from "../repository/rewardRepository.js";
import dbHandler from "../repository/index.js";
import notFound from "./not-found.js";
import defaultHeader from "../helpers/defaultHeader.js";

class RewardController {
    static getRewards = async (_) => {
        try {
            const rewards = await dbHandler(rewardRepository.getRewards);
            return {
                defaultHeader,
                statusCode: 200,
                body: { rewards }
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
    static getRewardById = async (httpRequest) => {
        try {
            const reward = await dbHandler(rewardRepository.getRewardById,
                httpRequest.body,
                httpRequest.params
            );
            if (!reward) {
                return notFound();
            }
            return {
                defaultHeader,
                statusCode: 200,
                body: reward
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

    static addReward = async (httpRequest) => {
        try {
            const success = await dbHandler(rewardRepository.addReward, httpRequest.body);
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

    static deleteReward = async (httpRequest) => {
        try {
            const success = await dbHandler(
                rewardRepository.deleteReward,
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
}

export default RewardController;