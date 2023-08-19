"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Entities_1 = require("./entity/Entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Entities_1.ServiceType, Entities_1.VisitFrequency, Entities_1.OrderComment, Entities_1.OrderHistory, Entities_1.ClientDayChoice, Entities_1.OrderStatus, Entities_1.ClientHourChoice, Entities_1.EstateSize, Entities_1.DistrictName, Entities_1.User, Entities_1.Client, Entities_1.Vendor, Entities_1.Schedule, Entities_1.WeekdayAvailability, Entities_1.Service, Entities_1.Portfolio, Entities_1.PortfolioImage, Entities_1.Order, Entities_1.Event],
    migrations: [],
    subscribers: [],
    logger: 'file',
});
