import { IsUrl, Length, IsEmail, IsOptional, IsPhoneNumber, MinLength } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  Relation,
  PrimaryColumn,
  RelationOptions,
  Index,
} from "typeorm";

export enum Role {
  ADMIN = 0,
  CLIENT,
  VENDOR_COMPANY,
  VENDOR_INDIVIDUAL,
}

export enum DayOfWeek {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export enum OrderHistoryLogType {
  NEW = 1,
  OFFER,
  RESERVATION,
  ACTIVE,
  COMPLETE,
  CANCELLED,
  UPDATED,
}

export enum ORDER_STATUS {
  NEW = 1,
  OFFER,
  RESERVATION,
  ACTIVE,
  COMPLETE,
  CANCELLED,
  PASSED
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 30 })
  @Length(2, 30)
  firstName: string;

  @Column("varchar", { length: 30 })
  @Length(2, 30)
  lastName: string;

  @Column("varchar", { length: 20, nullable: true })
  @IsPhoneNumber("BG")
  @IsOptional()
  phone: string;

  @Column("varchar", { length: 100, nullable: true })
  @IsOptional()
  imageUrl: string;

  @Column("varchar", { length: 50 })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isSuspended: boolean;

  @Column("smallint", { array: true })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Client, (client) => client.user, { cascade: true })
  @JoinColumn()
  client: Relation<Client>;

  @Column({ nullable: true })
  @IsOptional()
  clientId: number;

  @OneToOne(() => Vendor, (vendor) => vendor.user, { cascade: true })
  @JoinColumn()
  vendor: Relation<Vendor>;

  @Column({ nullable: true })
  @IsOptional()
  vendorId: number;

  @OneToMany(() => OrderComment, (orderComment) => orderComment.user)
  orderComment: Relation<OrderComment[]>;

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.user)
  orderHistory: Relation<OrderHistory[]>;
}

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  address: string;

  @Column({ nullable: true })
  @IsOptional()
  city: string;

  @ManyToOne(() => DistrictName, (districtName) => districtName.order, { cascade: true, eager: true })
  district: Relation<DistrictName>;

  @OneToOne(() => User, (user) => user.client)
  user: User;

  @OneToMany(() => Order, (order) => order.client)
  orders: Relation<Order[]>;
}

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  companyName: string;

  @Column({ nullable: true })
  @IsOptional()
  city: string;

  @Column("varchar", { nullable: true })
  @IsOptional()
  @MinLength(10)
  about: string;

  @Column("varchar", { length: 50, nullable: true })
  @IsOptional()
  @IsUrl()
  website: string;

  @Column("varchar", { length: 50, nullable: true })
  @IsOptional()
  @IsUrl()
  instagram: string;

  @Column("varchar", { length: 50, nullable: true })
  @IsOptional()
  @IsUrl()
  facebook: string;

  @OneToOne(() => User, (user) => user.vendor)
  user: User;

  // @Column({ nullable: true })
  // @IsOptional()
  // userId: string;

  @ManyToMany(() => DistrictName, (districtName) => districtName.vendor, { cascade: true, eager: true })
  @JoinTable()
  servedDistrict: DistrictName[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.vendor, { eager: true, cascade: true })
  portfolio: Relation<Portfolio[]>;

  @OneToMany(() => PortfolioImage, (portfolioImage) => portfolioImage.vendor, { eager: true, cascade: true })
  portfolioImage: Relation<PortfolioImage[]>;

  @OneToOne(() => Schedule, (schedule) => schedule.vendor)
  schedule: Relation<Schedule>;

  // @OneToMany(() => Event, (event) => event.client)
  // event: Event[];

  @OneToMany(() => Order, (order) => order.client)
  orders: Relation<Order[]>;

  @Column("boolean", { default: false })
  isAdhocEnabled: boolean;

  @Column("boolean", { default: false })
  isSubscriptionEnabled: boolean;
}

// @Entity()
// export class District {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   districtName: string;

//   @ManyToMany(() => Vendor, (vendor) => vendor.servedDistrict)
//   vendor: Vendor[];
// }

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date", { array: true })
  skippedDays: Date[];

  @Column("varchar", { array: true })
  managedFrequencies: VisitFrequency[];

  @OneToOne(() => Vendor, (vendor) => vendor.schedule)
  @JoinColumn()
  vendor: Vendor;

  @OneToMany(() => WeekdayAvailability, (weekdayAvailability) => weekdayAvailability.schedule)
  availability: Relation<WeekdayAvailability[]>;
}

@Entity()
export class WeekdayAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekday: DayOfWeek;

  @Column("date", { array: true })
  activeHours: Date[];

  @ManyToOne(() => Schedule, (schedule) => schedule.availability)
  schedule: Schedule;
}

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 30 })
  category: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.service)
  portfolio: Portfolio[];

  // @OneToMany(() => Event, (event) => event.service)
  // event: Relation<Event>;
}

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  price: string;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.portfolio, { eager: true })
  service: Relation<ServiceType>;

  @ManyToOne(() => Vendor, (vendor) => vendor.portfolio)
  vendor: Vendor;
}

@Entity()
export class PortfolioImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.portfolioImage)
  vendor: Vendor;
}

@Entity()
export class OrderComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orderComment)
  user: Relation<User>;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.orderComment)
  order: Relation<Order>;
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  additionalInfo: string;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.order, { cascade: true, eager: true })
  serviceType: Relation<ServiceType>;

  @ManyToOne(() => VisitFrequency, (visitFrequency) => visitFrequency.order, { cascade: true, eager: true })
  visitFrequency: Relation<VisitFrequency>;

  @ManyToMany(() => ClientDayChoice, (clientDayChoice) => clientDayChoice.order, { cascade: true, eager: true })
  @JoinTable()
  clientDayChoice: Relation<ClientDayChoice[]>;

  @ManyToMany(() => ClientHourChoice, (clientHourChoice) => clientHourChoice.order, { cascade: true, eager: true })
  @JoinTable()
  clientHourChoice: Relation<ClientHourChoice[]>;

  @ManyToOne(() => ClientDayChoice, (clientDayChoice) => clientDayChoice.order, { cascade: true, eager: true })
  visitDay: Relation<ClientDayChoice>;

  @ManyToOne(() => ClientHourChoice, (clientHourChoice) => clientHourChoice.order, { cascade: true, eager: true })
  visitHour: Relation<ClientHourChoice>;

  @Column("varchar", { array: true, nullable: true })
  @IsOptional()
  additionalService: string[];

  @ManyToOne(() => EstateSize, (estateSize) => estateSize.order, { cascade: true, eager: true })
  estateSize: Relation<EstateSize>;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.order, { cascade: true, eager: true })
  @JoinColumn({ name: "orderStatusId" })
  orderStatus: Relation<OrderStatus>;

  @Column({ nullable: true })
  orderStatusId: number;

  @ManyToOne(() => DistrictName, (districtName) => districtName.order, { cascade: true, eager: true })
  districtName: Relation<DistrictName>;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @Column({ nullable: true })
  clientId: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  vendor: Vendor;

  @Column({ nullable: true })
  vendorId: number;

  @OneToMany(() => OrderComment, (orderComment) => orderComment.order, { eager: true })
  orderComment: Relation<OrderComment[]>;

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order, { eager: true })
  orderHistory: Relation<OrderHistory[]>;

  @OneToMany(() => Event, (event) => event.order)
  event: Relation<Event[]>;

  @CreateDateColumn()
  createdAt: Date;

  @Column("varchar", { nullable: true })
  @IsOptional()
  startDate: string;

  @Column("varchar", { nullable: true })
  @IsOptional()
  endDate: Date;
}

@Entity()
export class Event {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Order, (order) => order.event)
  order: Order;
  
  @Column()
  status: ORDER_STATUS;

  @Column()
  rating: number;

  @Column()
  feedback: string;
}

// Seeds
@Entity()
export class ServiceType {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  description: string;

  @Column()
  imgUrl: string;

  @ManyToMany(() => Order, (order) => order.serviceType)
  order: Order[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.service)
  portfolio: Portfolio[];
}

@Entity()
export class VisitFrequency {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => Order, (order) => order.visitFrequency)
  order: Order[];
}

@Entity()
export class ClientDayChoice {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @ManyToMany(() => Order, (order) => order.clientDayChoice)
  order: Order[];
}

@Entity()
export class OrderStatus {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => Order, (order) => order.orderStatus)
  order: Order[];
}

@Entity()
export class ClientHourChoice {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  daytime: string;

  @ManyToMany(() => Order, (order) => order.clientHourChoice)
  order: Order[];
}

@Entity()
export class EstateSize {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => Order, (order) => order.estateSize)
  order: Order[];
}

@Entity()
export class DistrictName {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => Order, (order) => order.districtName)
  order: Order[];

  @OneToMany(() => Client, (client) => client.district)
  client: Client[];

  @ManyToMany(() => Vendor, (vendor) => vendor.servedDistrict)
  vendor: Vendor[];
}

@Entity()
export class OrderHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  updateType: OrderHistoryLogType;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orderHistory, { cascade: true, eager: true })
  user: User;

  @ManyToOne(() => Order, (order) => order.orderHistory, { cascade: "update" as unknown as RelationOptions["cascade"] })
  order: Order;
}
