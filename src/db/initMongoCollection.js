import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";



export const initMongoConnection = async () => {
    try {
        const password = getEnvVar("MONGODB_PASSWORD");
        const user = getEnvVar("MONGODB_USER");
        const url = getEnvVar("MONGODB_URL");
        const database = getEnvVar("MONGODB_DB");
        mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${database}?retryWrites=true&w=majority&appName=Cluster04`);
        console.log("Seccessful connection to DB");
        
    }
    catch (error) { 
        console.log(error);
        throw error;
    }
};