import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoCollection.js";
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;



const bootstrap = async () => {

    await initMongoConnection();
    setupServer();
};

bootstrap();