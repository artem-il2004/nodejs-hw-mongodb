import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoCollection.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;



const bootstrap = async () => {

    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

bootstrap();