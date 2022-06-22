import faker from 'faker';
import mongoose from 'mongoose';

export default function makeFakeMission(overrides) {
    const mission = {
        _id: mongoose.Types.ObjectId.createFromTime(1),
        name: faker.name.findName(),
        description: faker.lorem.paragraph(1),
        points: 1520,
        expirationDate: Date.now(),
        createdOn: Date.now(),
        createdBy: mongoose.Types.ObjectId.createFromTime(2),
        participants: [],
        completers: [],
        formUrl: faker.internet.domainName()
    }
    return { ...mission, ...overrides }
}