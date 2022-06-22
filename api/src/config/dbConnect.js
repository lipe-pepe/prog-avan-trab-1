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
            console.log('Connecting to MongoDB');
            await mongoose.connect('mongodb://localhost:27017/unipresente');
            console.log('Connected to MongoDB');
        } catch (error) {
            throw Error(`Error connecting to MongoDB: ${error.message}`);
        }
    }
}