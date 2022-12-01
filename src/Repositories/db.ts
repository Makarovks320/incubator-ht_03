import {MongoClient} from 'mongodb'

const mongoUri = process.env.mongoURI || "mongodb://localhost:27017";
export const client = new MongoClient(mongoUri);

export async function runDb() {
    try {
        // Use connect method to connect to the server
        await client.connect();
        // Establish and verify connection
        const db = client.db('ht_03').command({ping: 1});
        console.log('Connected successfully to server');

    } catch {//todo почему мы не делаем finally после/вместо catch?
        await client.close();
    }
}
