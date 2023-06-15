import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const dbClient = async () => {
    const uri = process.env.DB_URI;
    let client;

    try{
        client = await mongoose.connect(uri,
            {useNewUrlParser: true, useUnifiedTopology: true}
        )
        console.log("Connected to DB");
        return client;

    } catch (e) {
        throw new Error(e);
    }
};

export default dbClient;