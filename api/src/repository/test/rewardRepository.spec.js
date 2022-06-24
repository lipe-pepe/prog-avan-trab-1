import mongoose from "mongoose";
import db from "../../../tests/db.js"
import rewardRepository from "../rewardRepository.js";
import makeFakeReward from "../../../tests/mocks/Reward.js"

beforeAll(async () => await db.connect());

afterAll(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe('Rewards ', () => {
    it('GET /rewards --> get empty rewards list', async () => {
        const response = await rewardRepository.getRewards();
        expect(response).toEqual([]);
    });

    it('POST /rewards --> add reward', async () => {
        const response = await rewardRepository.addReward(makeFakeReward());
        expect(response).toEqual(true);
    })

    it('GET /rewards --> get filled rewards list', async () => {
        const response = await rewardRepository.getRewards();
        expect(response).toEqual(expect.arrayContaining([expect.objectContaining({
            _id: expect.any(mongoose.Types.ObjectId),
            __v: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
            availability: expect.any(Number),
            createdOn: expect.any(Date),
            claimers: expect.any(Array),
            handed: expect.any(Array)
        })]));
    });

    it('GET /rewards/:id --> get reward by id', async () => {
        const response = await rewardRepository.getRewardById(null,
            { id: mongoose.Types.ObjectId.createFromTime(1).toString() });
        expect(response).toEqual(expect.objectContaining({
            _id: expect.any(mongoose.Types.ObjectId),
            __v: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
            availability: expect.any(Number),
            createdOn: expect.any(Date),
            claimers: expect.any(Array),
            handed: expect.any(Array)
        }));
    });

    it('GET /rewards/:id --> get reward by id not found', async () => {
        const response = await rewardRepository.getRewardById(null,
            { id: "62b2c826129150caef2cab3e" });
        expect(response).toEqual(null);
    });

    it('DELETE /rewards/:id?userId --> bad format of ObjectId', async () => {
        expect(rewardRepository.deleteReward({}, { id: "aa" }, { userId: "bb" })).rejects
            .toThrow();
    });

    it('DELETE /rewards/:id?userId --> reward doesn\'t exist', async () => {
        expect(rewardRepository.deleteReward({}, { id: "62b2c826129150caef2cab3e" }, { userId: "62b2c826129150caef2cab3e" })).rejects
            .toThrow(`Reward doesn't exist`);
    });

    it('DELETE /rewards/:id?userId --> reward deleted', async () => {
        const response = await rewardRepository.deleteReward(
            null,
            { id: mongoose.Types.ObjectId.createFromTime(1).toString() }
        );
        expect(response).toEqual(true);
    });

    it('POST /users/:id/rewards/:rewardId --> user claim reward', async () => {
        const response = await rewardRepository.userClaimReward(
            makeFakeReward(),
            { userId: mongoose.Types.ObjectId.createFromTime(7).toString() });
        expect(response).toEqual(true);
    });

    it('POST /users/:id/rewards/:rewardId --> user already claimed reward', async () => {
        expect(rewardRepository.userClaimReward(
            makeFakeReward({ claimers: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { userId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`User already claimed this reward`);
    });

    it('POST /users/:id/rewards/:rewardId --> reward already handed to user', async () => {
        expect(rewardRepository.userClaimReward(
            makeFakeReward({ handed: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { userId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`Reward already handed to this user`);
    });

    it('POST /users/:id/rewards/:rewardId --> reward unavailable', async () => {
        expect(rewardRepository.userClaimReward(
            makeFakeReward({ availability: 0 }),
            { userId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`Reward unavailable`);
    });

    it('PUT /users/:id/rewards/:rewardId --> hand out reward', async () => {
        const response = await rewardRepository.handOutReward(
            makeFakeReward({ claimers: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { userId: mongoose.Types.ObjectId.createFromTime(7).toString() });
        expect(response).toEqual(true);
    });

    it('PUT /users/:id/rewards/:rewardId --> user did not claim reward', async () => {
        expect(rewardRepository.handOutReward(
            makeFakeReward(),
            { userId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`User did not claim this reward`);
    });

    it('PUT /users/:id/rewards/:rewardId --> already handed reward', async () => {
        expect(rewardRepository.handOutReward(
            makeFakeReward({ handed: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { userId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`Reward already handed to this user`);
    });

});