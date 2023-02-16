import "./types/declarations";
import "reflect-metadata"
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { app } from "./app";

const PORT = process.env.PORT || 9000;

// Start the server
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});


async function main() {
}

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
