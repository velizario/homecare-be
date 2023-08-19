"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHistory = exports.DistrictName = exports.EstateSize = exports.ClientHourChoice = exports.OrderStatus = exports.ClientDayChoice = exports.VisitFrequency = exports.ServiceType = exports.Event = exports.Order = exports.OrderComment = exports.PortfolioImage = exports.Portfolio = exports.Service = exports.WeekdayAvailability = exports.Schedule = exports.Vendor = exports.Client = exports.User = exports.ORDER_STATUS = exports.OrderHistoryLogType = exports.DayOfWeek = exports.Role = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["CLIENT"] = 1] = "CLIENT";
    Role[Role["VENDOR_COMPANY"] = 2] = "VENDOR_COMPANY";
    Role[Role["VENDOR_INDIVIDUAL"] = 3] = "VENDOR_INDIVIDUAL";
})(Role = exports.Role || (exports.Role = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["MONDAY"] = 0] = "MONDAY";
    DayOfWeek[DayOfWeek["TUESDAY"] = 1] = "TUESDAY";
    DayOfWeek[DayOfWeek["WEDNESDAY"] = 2] = "WEDNESDAY";
    DayOfWeek[DayOfWeek["THURSDAY"] = 3] = "THURSDAY";
    DayOfWeek[DayOfWeek["FRIDAY"] = 4] = "FRIDAY";
    DayOfWeek[DayOfWeek["SATURDAY"] = 5] = "SATURDAY";
    DayOfWeek[DayOfWeek["SUNDAY"] = 6] = "SUNDAY";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
var OrderHistoryLogType;
(function (OrderHistoryLogType) {
    OrderHistoryLogType[OrderHistoryLogType["NEW"] = 1] = "NEW";
    OrderHistoryLogType[OrderHistoryLogType["OFFER"] = 2] = "OFFER";
    OrderHistoryLogType[OrderHistoryLogType["RESERVATION"] = 3] = "RESERVATION";
    OrderHistoryLogType[OrderHistoryLogType["ACTIVE"] = 4] = "ACTIVE";
    OrderHistoryLogType[OrderHistoryLogType["COMPLETE"] = 5] = "COMPLETE";
    OrderHistoryLogType[OrderHistoryLogType["CANCELLED"] = 6] = "CANCELLED";
    OrderHistoryLogType[OrderHistoryLogType["UPDATED"] = 7] = "UPDATED";
})(OrderHistoryLogType = exports.OrderHistoryLogType || (exports.OrderHistoryLogType = {}));
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS[ORDER_STATUS["NEW"] = 1] = "NEW";
    ORDER_STATUS[ORDER_STATUS["OFFER"] = 2] = "OFFER";
    ORDER_STATUS[ORDER_STATUS["RESERVATION"] = 3] = "RESERVATION";
    ORDER_STATUS[ORDER_STATUS["ACTIVE"] = 4] = "ACTIVE";
    ORDER_STATUS[ORDER_STATUS["COMPLETE"] = 5] = "COMPLETE";
    ORDER_STATUS[ORDER_STATUS["CANCELLED"] = 6] = "CANCELLED";
    ORDER_STATUS[ORDER_STATUS["PASSED"] = 7] = "PASSED";
})(ORDER_STATUS = exports.ORDER_STATUS || (exports.ORDER_STATUS = {}));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30 }),
    (0, class_validator_1.Length)(2, 30),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30 }),
    (0, class_validator_1.Length)(2, 30),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 20, nullable: true }),
    (0, class_validator_1.IsPhoneNumber)("BG"),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isSuspended", void 0);
__decorate([
    (0, typeorm_1.Column)("smallint", { array: true }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Client, (client) => client.user, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], User.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], User.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Vendor, (vendor) => vendor.user, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], User.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], User.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderComment, (orderComment) => orderComment.user),
    __metadata("design:type", Object)
], User.prototype, "orderComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderHistory, (orderHistory) => orderHistory.user),
    __metadata("design:type", Object)
], User.prototype, "orderHistory", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
let Client = class Client {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Client.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Client.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DistrictName, (districtName) => districtName.order, { cascade: true, eager: true }),
    __metadata("design:type", Object)
], Client.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User, (user) => user.client),
    __metadata("design:type", User)
], Client.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order, (order) => order.client),
    __metadata("design:type", Object)
], Client.prototype, "orders", void 0);
Client = __decorate([
    (0, typeorm_1.Entity)()
], Client);
exports.Client = Client;
let Vendor = class Vendor {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vendor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Vendor.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Vendor.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], Vendor.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Vendor.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Vendor.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Vendor.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User, (user) => user.vendor),
    __metadata("design:type", User)
], Vendor.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => DistrictName, (districtName) => districtName.vendor, { cascade: true, eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Vendor.prototype, "servedDistrict", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Portfolio, (portfolio) => portfolio.vendor, { eager: true, cascade: true }),
    __metadata("design:type", Object)
], Vendor.prototype, "portfolio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PortfolioImage, (portfolioImage) => portfolioImage.vendor, { eager: true, cascade: true }),
    __metadata("design:type", Object)
], Vendor.prototype, "portfolioImage", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Schedule, (schedule) => schedule.vendor),
    __metadata("design:type", Object)
], Vendor.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order, (order) => order.client),
    __metadata("design:type", Object)
], Vendor.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], Vendor.prototype, "isAdhocEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], Vendor.prototype, "isSubscriptionEnabled", void 0);
Vendor = __decorate([
    (0, typeorm_1.Entity)()
], Vendor);
exports.Vendor = Vendor;
// @Entity()
// export class District {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column()
//   districtName: string;
//   @ManyToMany(() => Vendor, (vendor) => vendor.servedDistrict)
//   vendor: Vendor[];
// }
let Schedule = class Schedule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { array: true }),
    __metadata("design:type", Array)
], Schedule.prototype, "skippedDays", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { array: true }),
    __metadata("design:type", Array)
], Schedule.prototype, "managedFrequencies", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Vendor, (vendor) => vendor.schedule),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Vendor)
], Schedule.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WeekdayAvailability, (weekdayAvailability) => weekdayAvailability.schedule),
    __metadata("design:type", Object)
], Schedule.prototype, "availability", void 0);
Schedule = __decorate([
    (0, typeorm_1.Entity)()
], Schedule);
exports.Schedule = Schedule;
let WeekdayAvailability = class WeekdayAvailability {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WeekdayAvailability.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WeekdayAvailability.prototype, "weekday", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { array: true }),
    __metadata("design:type", Array)
], WeekdayAvailability.prototype, "activeHours", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schedule, (schedule) => schedule.availability),
    __metadata("design:type", Schedule)
], WeekdayAvailability.prototype, "schedule", void 0);
WeekdayAvailability = __decorate([
    (0, typeorm_1.Entity)()
], WeekdayAvailability);
exports.WeekdayAvailability = WeekdayAvailability;
let Service = class Service {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30 }),
    __metadata("design:type", String)
], Service.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Portfolio, (portfolio) => portfolio.service),
    __metadata("design:type", Array)
], Service.prototype, "portfolio", void 0);
Service = __decorate([
    (0, typeorm_1.Entity)()
], Service);
exports.Service = Service;
let Portfolio = class Portfolio {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Portfolio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Portfolio.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ServiceType, (serviceType) => serviceType.portfolio, { eager: true }),
    __metadata("design:type", Object)
], Portfolio.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendor, (vendor) => vendor.portfolio),
    __metadata("design:type", Vendor)
], Portfolio.prototype, "vendor", void 0);
Portfolio = __decorate([
    (0, typeorm_1.Entity)()
], Portfolio);
exports.Portfolio = Portfolio;
let PortfolioImage = class PortfolioImage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PortfolioImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PortfolioImage.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendor, (vendor) => vendor.portfolioImage),
    __metadata("design:type", Vendor)
], PortfolioImage.prototype, "vendor", void 0);
PortfolioImage = __decorate([
    (0, typeorm_1.Entity)()
], PortfolioImage);
exports.PortfolioImage = PortfolioImage;
let OrderComment = class OrderComment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.orderComment),
    __metadata("design:type", Object)
], OrderComment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderComment.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderComment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order, (order) => order.orderComment),
    __metadata("design:type", Object)
], OrderComment.prototype, "order", void 0);
OrderComment = __decorate([
    (0, typeorm_1.Entity)()
], OrderComment);
exports.OrderComment = OrderComment;
let Order = class Order {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Order.prototype, "additionalInfo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ServiceType, (serviceType) => serviceType.order, { cascade: true, eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "serviceType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => VisitFrequency, (visitFrequency) => visitFrequency.order, { cascade: true, eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "visitFrequency", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ClientDayChoice, (clientDayChoice) => clientDayChoice.order, { cascade: true, eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Object)
], Order.prototype, "clientDayChoice", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ClientHourChoice, (clientHourChoice) => clientHourChoice.order, { cascade: true, eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Object)
], Order.prototype, "clientHourChoice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ClientDayChoice, (clientDayChoice) => clientDayChoice.order, { cascade: true, eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "visitDay", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ClientHourChoice, (clientHourChoice) => clientHourChoice.order, { cascade: true, eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "visitHour", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { array: true, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], Order.prototype, "additionalService", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EstateSize, (estateSize) => estateSize.order, { cascade: true, eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "estateSize", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrderStatus, (orderStatus) => orderStatus.order, { cascade: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "orderStatusId" }),
    __metadata("design:type", Object)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Order.prototype, "orderStatusId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DistrictName, (districtName) => districtName.order, { cascade: true, eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "districtName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client, (client) => client.orders),
    __metadata("design:type", Client)
], Order.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Order.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vendor, (vendor) => vendor.orders),
    __metadata("design:type", Vendor)
], Order.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Order.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderComment, (orderComment) => orderComment.order, { eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "orderComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderHistory, (orderHistory) => orderHistory.order, { eager: true }),
    __metadata("design:type", Object)
], Order.prototype, "orderHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Event, (event) => event.order),
    __metadata("design:type", Object)
], Order.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Order.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Order.prototype, "endDate", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
exports.Order = Order;
let Event = class Event {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order, (order) => order.event),
    __metadata("design:type", Order)
], Event.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Event.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Event.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Event.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Event.prototype, "feedback", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
exports.Event = Event;
// Seeds
let ServiceType = class ServiceType {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ServiceType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceType.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceType.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Order, (order) => order.serviceType),
    __metadata("design:type", Array)
], ServiceType.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Portfolio, (portfolio) => portfolio.service),
    __metadata("design:type", Array)
], ServiceType.prototype, "portfolio", void 0);
ServiceType = __decorate([
    (0, typeorm_1.Entity)()
], ServiceType);
exports.ServiceType = ServiceType;
let VisitFrequency = class VisitFrequency {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], VisitFrequency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VisitFrequency.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order, (order) => order.visitFrequency),
    __metadata("design:type", Array)
], VisitFrequency.prototype, "order", void 0);
VisitFrequency = __decorate([
    (0, typeorm_1.Entity)()
], VisitFrequency);
exports.VisitFrequency = VisitFrequency;
let ClientDayChoice = class ClientDayChoice {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ClientDayChoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientDayChoice.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Order, (order) => order.clientDayChoice),
    __metadata("design:type", Array)
], ClientDayChoice.prototype, "order", void 0);
ClientDayChoice = __decorate([
    (0, typeorm_1.Entity)()
], ClientDayChoice);
exports.ClientDayChoice = ClientDayChoice;
let OrderStatus = class OrderStatus {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], OrderStatus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderStatus.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order, (order) => order.orderStatus),
    __metadata("design:type", Array)
], OrderStatus.prototype, "order", void 0);
OrderStatus = __decorate([
    (0, typeorm_1.Entity)()
], OrderStatus);
exports.OrderStatus = OrderStatus;
let ClientHourChoice = class ClientHourChoice {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ClientHourChoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientHourChoice.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientHourChoice.prototype, "daytime", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Order, (order) => order.clientHourChoice),
    __metadata("design:type", Array)
], ClientHourChoice.prototype, "order", void 0);
ClientHourChoice = __decorate([
    (0, typeorm_1.Entity)()
], ClientHourChoice);
exports.ClientHourChoice = ClientHourChoice;
let EstateSize = class EstateSize {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], EstateSize.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstateSize.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order, (order) => order.estateSize),
    __metadata("design:type", Array)
], EstateSize.prototype, "order", void 0);
EstateSize = __decorate([
    (0, typeorm_1.Entity)()
], EstateSize);
exports.EstateSize = EstateSize;
let DistrictName = class DistrictName {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], DistrictName.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DistrictName.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order, (order) => order.districtName),
    __metadata("design:type", Array)
], DistrictName.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Client, (client) => client.district),
    __metadata("design:type", Array)
], DistrictName.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Vendor, (vendor) => vendor.servedDistrict),
    __metadata("design:type", Array)
], DistrictName.prototype, "vendor", void 0);
DistrictName = __decorate([
    (0, typeorm_1.Entity)()
], DistrictName);
exports.DistrictName = DistrictName;
let OrderHistory = class OrderHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderHistory.prototype, "updateType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.orderHistory, { cascade: true, eager: true }),
    __metadata("design:type", User)
], OrderHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order, (order) => order.orderHistory, { cascade: "update" }),
    __metadata("design:type", Order)
], OrderHistory.prototype, "order", void 0);
OrderHistory = __decorate([
    (0, typeorm_1.Entity)()
], OrderHistory);
exports.OrderHistory = OrderHistory;
