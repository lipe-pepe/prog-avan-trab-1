import mongoose from "mongoose";
import db from "../../../tests/db.js"
import missionRepository from "../missionRepository.js";
import makeFakeMission from "../../../tests/mocks/Mission.js"

beforeAll(async () => await db.connect());

afterAll(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe('Missions ', () => {
    it('GET /missions --> get empty missions list', async () => {
        const response = await missionRepository.getMissions();
        expect(response).toEqual([]);
    });

    it('POST /missions --> add mission', async () => {
        const response = await missionRepository.addMission(makeFakeMission({ formUrl: "www.google.com" }));
        expect(response).toEqual(true);
    })

    it('POST /missions --> add incorrect mission', async () => {
        expect(missionRepository.addMission(makeFakeMission({ formUrl: "www.google.com" }))).rejects
            .toThrow(`There's already a mission created with the given form Url: www.google.com`);
    })

    it('GET /missions --> get filled missions list', async () => {
        const response = await missionRepository.getMissions();
        expect(response).toEqual(expect.arrayContaining([expect.objectContaining({
            _id: expect.any(mongoose.Types.ObjectId),
            __v: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            points: expect.any(Number),
            expirationDate: expect.any(Date),
            createdOn: expect.any(Date),
            createdBy: expect.any(mongoose.Types.ObjectId),
            participants: expect.any(Array),
            completers: expect.any(Array),
            formUrl: expect.any(String)
        })]));
    });

    it('DELETE /missions/:id?userId --> bad format of ObjectId', async () => {
        expect(missionRepository.deleteMission({}, { id: "aa" }, { userId: "bb" })).rejects
            .toThrow();
    });

    it('DELETE /missions/:id?userId --> mission doesn\'t exist', async () => {
        expect(missionRepository.deleteMission({}, { id: "62b2c826129150caef2cab3e" }, { userId: "62b2c826129150caef2cab3e" })).rejects
            .toThrow(`Mission doesn't exist`);
    });

    it('DELETE /missions/:id?userId --> user not authorized', async () => {
        expect(missionRepository.deleteMission(null,
            { id: mongoose.Types.ObjectId.createFromTime(1).toString() },
            { userId: mongoose.Types.ObjectId.createFromTime(1).toString() }
        )).rejects
            .toThrow(`Not authorized to delete this mission`);
    });

    it('DELETE /missions/:id?userId --> mission deleted', async () => {
        const response = await missionRepository.deleteMission(
            null,
            { id: mongoose.Types.ObjectId.createFromTime(1).toString() },
            { userId: mongoose.Types.ObjectId.createFromTime(2).toString() });
        expect(response).toEqual(true);
    });
    
});