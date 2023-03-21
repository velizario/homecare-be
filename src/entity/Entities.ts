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
} from "typeorm";

export enum Role {
  ADMIN,
  CLIENT,
  VENDOR_COMPANY,
  VENDOR_INDIVIDUAL,
}

export enum VisitFrequency {
  ONETIME,
  WEEKLY,
  BIWEEKLY,
  QUADWEEKLY,
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

export enum OrderStatus {
  NEW = 1,
  ACTIVE,
  COMPLETE,
  CANCELLED
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

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

  @OneToOne(() => Client, (client) => client.user, { cascade: true, eager: true })
  @JoinColumn()
  client: Relation<Client>;

  @Column({ nullable: true })
  @IsOptional()
  clientId: string;

  @OneToOne(() => Vendor, (vendor) => vendor.user, { cascade: true, eager: true })
  @JoinColumn()
  vendor: Relation<Vendor>;

  @Column({ nullable: true })
  @IsOptional()
  vendorId: string;
}

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  @IsOptional()
  address: string;

  @Column({ nullable: true })
  @IsOptional()
  city: string;

  @Column({ nullable: true })
  @IsOptional()
  district: string;

  @OneToOne(() => User, (user) => user.client)
  user: User;

  // @Column({ nullable: true })
  // @IsOptional()
  // userId: string;

  @OneToMany(() => Event, (event) => event.client)
  events: Relation<Event[]>;

  @OneToMany(() => Order, (order) => order.client)
  orders: Relation<Order[]>;
}

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: string;

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

  @ManyToMany(() => District, (district) => district.vendor, { cascade: true, eager: true })
  @JoinTable()
  servedDistrict: District[];

  @OneToOne(() => Portfolio, (prices) => prices.vendor)
  portfolio: Relation<Portfolio>;

  @OneToOne(() => Schedule, (schedule) => schedule.vendor)
  schedule: Relation<Schedule>;

  @OneToMany(() => Event, (event) => event.client)
  events: Event[];

  @OneToMany(() => Order, (order) => order.client)
  orders: Relation<Order[]>;
}

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  districtName: string;

  @ManyToMany(() => Vendor, (vendor) => vendor.servedDistrict)
  vendor: Vendor[];
}

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("date", { array: true })
  skippedDays: Date[];

  @Column("varchar", { array: true })
  managedFrequencies: VisitFrequency[];

  @OneToOne(() => Vendor, (vendor) => vendor.schedule)
  @JoinColumn()
  vendor: Vendor;

  @OneToMany(() => WeekdayAvailability, (weekdayAvailability) => weekdayAvailability.schedule)
  availability: Relation<WeekdayAvailability>;
}

@Entity()
export class WeekdayAvailability {
  @PrimaryGeneratedColumn()
  id: string;

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
  id: string;

  @Column("varchar", { length: 30 })
  category: string;

  @ManyToMany(() => Portfolio, (portfolio) => portfolio.services)
  portfolio: Portfolio[];

  @OneToMany(() => Event, (event) => event.service)
  event: Relation<Event>;
}

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  pricePerHour: number;

  @ManyToMany(() => Service, (service) => service.portfolio)
  @JoinTable()
  services: Service[];

  @OneToOne(() => Vendor, (vendor) => vendor.portfolio)
  @JoinColumn()
  vendor: Vendor;
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  service: string;

  @Column()
  frequency: VisitFrequency;

  @Column("integer", { array: true })
  serviceDay: DayOfWeek[];

  @Column("varchar", { array: true })
  serviceHour: string[];

  @Column("varchar", { array: true })
  additionalService: string[];

  @Column()
  areaSize: string;

  @Column({nullable: true})
  status: OrderStatus

  // @CreateDateColumn()
  // createdAt: Date;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @Column({ nullable: true })
  clientId: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  vendor: Client;

  @Column({ nullable: true })
  vendorId: number;
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  startDate: Date;

  @Column()
  frequency: VisitFrequency;

  @Column("date", { array: true })
  skippedDays: Date[];

  @ManyToOne(() => Client, (client) => client.events)
  client: Client;

  @ManyToOne(() => Vendor, (vendor) => vendor.events)
  vendor: Vendor;

  @ManyToOne(() => Service, (service) => service.event)
  service: Service;
}
