import { DataSource } from "typeorm";
import { Client, Districts, Event, Portfolio, Service, Schedule, User, Vendor, WeekdayAvailability } from "./entity/Entities";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Client, Vendor, Districts, Schedule, WeekdayAvailability, Service, Portfolio, Event],
    migrations: [],
    subscribers: [],
  });