import {MongoClient,Database} from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { EventSchema } from "./schemas.ts";
  
const connectMongoDB = async (): Promise<Database> => {
    const mongo_usr = "Arquitectura";
    const mongo_pwd = "asdfghjkl";
    const db_name = "Event";
    const mongo_uri = "cluster0.jnozffu.mongodb.net";
    const mongo_url = `mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?authMechanism=SCRAM-SHA-1`;
  
    const client = new MongoClient();
    await client.connect(mongo_url);
    const db = client.database(db_name);
    return db;
  };
  
  const db = await connectMongoDB();
  console.info(`MongoDB ${db.name} connected`);
  
  export const EventsCollection = db.collection<EventSchema>("Events");