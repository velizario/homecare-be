import "./utils/declarations";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../config.env") });
import { app } from "./app";

const PORT = process.env.PORT || 9000;

const DB = process.env.DATABASE.replace(
  process.env.DATABASE_PASS_PLACEHOLDER,
  process.env.DATABASE_PASSWORD
); 

mongoose
  .connect(DB, {
    autoIndex: true, 
  })
  .then(() => {
    console.log("DB connection successful!");
  });

// Start the server
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});
