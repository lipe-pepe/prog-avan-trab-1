import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = await MongoMemoryServer.create();

let db = mongoose.connection;

/**
 * Connect to the in-memory database.
 */
export async function connect() {
    const uri = mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true
    };

    await mongoose.connect(uri, mongooseOpts);
}

export async function closeDatabase() {
    await db.dropDatabase();
    await db.close();
    await mongod.stop();
}

export async function clearDatabase() {
    const collections = db.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}


const databaseService = Object.freeze({
    connect,
    closeDatabase,
    clearDatabase
})
export default databaseService;