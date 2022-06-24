import mongoose from "mongoose";

let db = mongoose.connection;

export default async function makeDb() {
    if (!db.db) {
        await connect();
        return db;
    }
    if (db.readyState != 1) {
        await connect();
        return db;
    }
    return db;

    async function connect() {
        try {
            const options = {
                serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                socketTimeoutMS: 45000
            };
            console.log('Connecting to MongoDB');
            await mongoose.connect('mongodb://host.docker.internal:27017/unipresente', options);
            console.log('Connected to MongoDB');
        } catch (error) {
            throw Error(`Error connecting to MongoDB: ${error.message}`);
        }
    }
}