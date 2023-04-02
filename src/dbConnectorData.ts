import { DataSource } from "typeorm";
import { Client, District, Event, Portfolio, Service, Schedule, User, Vendor, WeekdayAvailability, Order, SeedServiceType, SeedVisitDay, SeedDistrictName, SeedEstateSize, SeedOrderStatus, SeedVisitFrequency, SeedVisitHour } from "./entity/Entities";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [SeedServiceType, SeedVisitFrequency, SeedVisitDay, SeedOrderStatus, SeedVisitHour, SeedEstateSize, SeedDistrictName, User, Client, Vendor, District, Schedule, WeekdayAvailability, Service, Portfolio, Event, Order],
    migrations: [],
    subscribers: [],
    logger: 'file',
  });