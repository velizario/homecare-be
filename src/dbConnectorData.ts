import { DataSource } from "typeorm";
import { Client, Portfolio, PortfolioImage, OrderComment, OrderHistory, Service, Schedule, User, Vendor, WeekdayAvailability, Order, ServiceType, ClientDayChoice, DistrictName, EstateSize, OrderStatus, VisitFrequency, ClientHourChoice, Event } from "./entity/Entities";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [ServiceType, VisitFrequency, OrderComment, OrderHistory, ClientDayChoice, OrderStatus, ClientHourChoice, EstateSize, DistrictName, User, Client, Vendor, Schedule, WeekdayAvailability, Service, Portfolio, PortfolioImage, Order, Event],
    migrations: [],
    subscribers: [],
    logger: 'file',
  });