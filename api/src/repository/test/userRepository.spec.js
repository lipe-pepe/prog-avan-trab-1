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

});