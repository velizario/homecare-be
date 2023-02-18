import "./types/declarations";
import "reflect-metadata";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { app } from "./app";
import { AppDataSource } from "./DBConnectorData";

const PORT = process.env.PORT || 9000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Connected to DB on host ${"localhost"}`);
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
