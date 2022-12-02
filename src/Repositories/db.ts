import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import {blog} from "./blogs-db-repository";

dotenv.config();

const mongoUri = process.env.MONGO_CLOUD_URL;
if (!mongoUri) {
    throw new Error('db url is not passed')
}
const client = new MongoClient(mongoUri);
const db = client.db("ht_03");
export const blogCollection = db.collection<blog>("blogs");
export const postsCollection = db.collection<blog>("posts");

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
