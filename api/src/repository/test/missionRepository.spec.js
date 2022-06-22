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
});