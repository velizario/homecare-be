import "./types/declarations";
import "reflect-metadata";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { AppDataSource } from "./DBConnectorData";
import { app } from "./app";
import SeedsImpl from "./dao/seeds/seedEssentialDataRepository";

const PORT = process.env.PORT || 9000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Connected to DB on host ${"localhost"}`);
    // Run seeds
    // NOTE: uncomment to rerun seeds
    SeedsImpl.updateAllSeeds()
    // Start the server
    app.listen(PORT, () => {
      console.log(`App running on PORT ${PORT}...`);
    });
  })
  .catch((error) => console.log(error));

  

async function main() {}

main();

// .then(async () => {
//   await prisma.$disconnect();
// })
// .catch(async (e) => {
//   console.error(e);
//   await prisma.$disconnect();
//   process.exit(1);
// }
// );
