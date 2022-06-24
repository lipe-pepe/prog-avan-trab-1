import mongoose from "mongoose";
import db from "../../../tests/db.js"
import userRepository from "../userRepository.js";
import makeFakeUser from "../../../tests/mocks/User.js"

beforeAll(async () => await db.connect());

afterAll(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe('Users ', () => {
    it('GET /users --> get empty users list', async () => {
        const response = await userRepository.getUsers();
        expect(response).toEqual([]);
    });

    it('POST /users --> add user', async () => {
        const response = await userRepository.addUser(makeFakeUser({ email: "user@email.com" }));
        expect(response).toEqual(true);
    })

    it('POST /users --> add incorrect user', async () => {
        expect(userRepository.addUser(makeFakeUser({ email: "user@email.com" }))).rejects
            .toThrow(`There's already an user created with the given email: user@email.com`);
    })

    it('GET /users --> get filled users list', async () => {
        const response = await userRepository.getUsers();
        expect(response).toEqual(expect.arrayContaining([expect.objectContaining({
            _id: expect.any(mongoose.Types.ObjectId),
            __v: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            balance: expect.any(Number),
            totalPoints: expect.any(Number),
            createdOn: expect.any(Date),
            activeMissions: expect.any(Array),
            pendingRewards: expect.any(Array),
            completedMissions: expect.any(Array),
            claimedRewards: expect.any(Array)
        })]));
    });

    it('GET /users --> get user by id', async () => {
        const response = await userRepository.getUserById(
            null,
            { id: mongoose.Types.ObjectId.createFromTime(5).toString() });
        expect(response).toEqual(expect.objectContaining({
            _id: expect.any(mongoose.Types.ObjectId),
            __v: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            balance: expect.any(Number),
            totalPoints: expect.any(Number),
            createdOn: expect.any(Date),
            activeMissions: expect.any(Array),
            pendingRewards: expect.any(Array),
            completedMissions: expect.any(Array),
            claimedRewards: expect.any(Array)
        }));
    });

    it('GET /users --> get user by id not found', async () => {
        const response = await userRepository.getUserById(
            null,
            { id: "62b2c826129150caef2cab3e" });
        expect(response).toEqual(null);
    });

    it('DELETE /users/:id --> bad format of ObjectId', async () => {
        expect(userRepository.deleteUser({}, { id: "aa" })).rejects
            .toThrow();
    });

    it('DELETE /users/:id --> user doesn\'t exist', async () => {
        expect(userRepository.deleteUser({}, { id: "62b2c826129150caef2cab3e" })).rejects
            .toThrow(`User doesn't exist`);
    });

    it('DELETE /users/:id --> user deleted', async () => {
        const response = await userRepository.deleteUser(
            null,
            { id: mongoose.Types.ObjectId.createFromTime(5).toString() });
        expect(response).toEqual(true);
    });

    it('POST /users/:id/missions/:missionId --> subscribe on mission', async () => {
        const response = await userRepository.subscribeOnMission(
            makeFakeUser(),
            { missionId: mongoose.Types.ObjectId.createFromTime(7).toString() });
        expect(response).toEqual(true);
    });

    it('POST /users/:id/missions/:missionId --> already on mission', async () => {
        expect(userRepository.subscribeOnMission(
            makeFakeUser({ activeMissions: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { missionId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`User already participating on this mission`);
    });

    it('POST /users/:id/missions/:missionId --> already completed mission', async () => {
        expect(userRepository.subscribeOnMission(
            makeFakeUser({ completedMissions: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { missionId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`User already completed this mission`);
    });

    it('PUT /users/:id/missions/:missionId --> complete mission', async () => {
        const response = await userRepository.completeMission(
            makeFakeUser({ activeMissions: [mongoose.Types.ObjectId.createFromTime(7)] }),
            {
                missionId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                missionPoints: 1500
            });
        expect(response).toEqual(true);
    });

    it('PUT /users/:id/missions/:missionId --> not participating on mission', async () => {
        expect(userRepository.completeMission(
            makeFakeUser(),
            {
                missionId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                missionPoints: 1500
            }
        )).rejects
            .toThrow(`User is not participating on this mission`);
    });

    it('PUT /users/:id/missions/:missionId --> already completed mission', async () => {
        expect(userRepository.completeMission(
            makeFakeUser({
                activeMissions: [mongoose.Types.ObjectId.createFromTime(7)],
                completedMissions: [mongoose.Types.ObjectId.createFromTime(7)]
            }),
            {
                missionId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                missionPoints: 1500
            }
        )).rejects
            .toThrow(`User already completed this mission`);
    });

    it('POST /users/:id/rewards/:rewardId --> request reward', async () => {
        const response = await userRepository.requestReward(
            makeFakeUser(),
            {
                rewardId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                rewardPrice: 100
            });
        expect(response).toEqual(true);
    });

    it('POST /users/:id/rewards/:rewardId --> already requested reward', async () => {
        expect(userRepository.requestReward(
            makeFakeUser({ pendingRewards: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { rewardId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`User already requested this reward`);
    });

    it('POST /users/:id/rewards/:rewardId --> already received reward', async () => {
        expect(userRepository.requestReward(
            makeFakeUser({ claimedRewards: [mongoose.Types.ObjectId.createFromTime(7)] }),
            { rewardId: mongoose.Types.ObjectId.createFromTime(7).toString() }
        )).rejects
            .toThrow(`User already received this reward`);
    });

    it('POST /users/:id/rewards/:rewardId --> already completed reward', async () => {
        expect(userRepository.requestReward(
            makeFakeUser({ balance: 100 }),
            {
                rewardId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                rewardPrice: 1000
            }
        )).rejects
            .toThrow(`Insuficient balance`);
    });

    it('PUT /users/:id/rewards/:rewardId --> complete reward', async () => {
        const response = await userRepository.completeReward(
            makeFakeUser({ pendingRewards: [mongoose.Types.ObjectId.createFromTime(7)] }),
            {
                rewardId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                rewardPoints: 1500
            });
        expect(response).toEqual(true);
    });

    it('PUT /users/:id/rewards/:rewardId --> not participating on reward', async () => {
        expect(userRepository.completeReward(
            makeFakeUser(),
            {
                rewardId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                rewardPoints: 1500
            }
        )).rejects
            .toThrow(`User did not request this reward`);
    });

    it('PUT /users/:id/rewards/:rewardId --> already completed reward', async () => {
        expect(userRepository.completeReward(
            makeFakeUser({
                pendingRewards: [mongoose.Types.ObjectId.createFromTime(7)],
                claimedRewards: [mongoose.Types.ObjectId.createFromTime(7)]
            }),
            {
                rewardId: mongoose.Types.ObjectId.createFromTime(7).toString(),
                rewardPoints: 1500
            }
        )).rejects
            .toThrow(`User already claimed this reward`);
    });

});