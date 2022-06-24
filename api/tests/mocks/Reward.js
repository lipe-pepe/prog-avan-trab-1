import faker from 'faker';
import mongoose from 'mongoose';

export default function makeFakeReward(overrides) {
    const reward = {
        _id: mongoose.Types.ObjectId.createFromTime(1),
        name: faker.name.findName(),
        description: faker.lorem.paragraph(1),
        price: 300,
        availability: 1,
        createdOn: Date.now(),
        claimers: [],
        handed: []
    }
    return { ...reward, ...overrides }
}