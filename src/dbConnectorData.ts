import { DataSource } from "typeorm";
import { Client, District, Portfolio, OrderComment, OrderHistory, Service, Schedule, User, Vendor, WeekdayAvailability, Order, ServiceType, VisitDay, DistrictName, EstateSize, OrderStatus, VisitFrequency, VisitHour } from "./entity/Entities";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [ServiceType, VisitFrequency, OrderComment, OrderHistory, VisitDay, OrderStatus, VisitHour, EstateSize, DistrictName, User, Client, Vendor, District, Schedule, WeekdayAvailability, Service, Portfolio,  Order],
    migrations: [],
    subscribers: [],
    logger: 'file',
  });