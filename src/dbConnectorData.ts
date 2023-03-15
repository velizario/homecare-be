import { DataSource } from "typeorm";
import { Client, District, Event, Portfolio, Service, Schedule, User, Vendor, WeekdayAvailability } from "./entity/Entities";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [User, Client, Vendor, District, Schedule, WeekdayAvailability, Service, Portfolio, Event],
    migrations: [],
    subscribers: [],
    logger: 'file',
  });