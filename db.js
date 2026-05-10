
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI

let client;
let db;

export async function dbConnect() {
    try {
        if (!client) {
            client = new MongoClient(uri);
            await client.connect();
            db = client.db("EasyInvite");
        }
        return db;
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}
