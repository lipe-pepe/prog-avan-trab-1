import faker from 'faker';
import mongoose from 'mongoose';

export default function makeFakeUser(overrides) {
    const user = {
        _id: mongoose.Types.ObjectId.createFromTime(5),
        name: faker.name.findName(),
        email: faker.internet.email()
    }
    return { ...user, ...overrides }
}