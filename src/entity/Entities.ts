import { IsUrl, Length, IsEmail, IsOptional } from "class-validator";
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

  @Column("varchar", { length: 100, nullable: true })
  @IsOptional()
  @IsUrl()
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
  client: Relation<Client>;

  @OneToOne(() => Vendor, (vendor) => vendor.user, { cascade: true })
  vendor: Relation<Vendor>;
}

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  @IsOptional()
  userId: string;

  @OneToMany(() => Event, (event) => event.client)
  events: Event[];
}

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar", { length: 50 })
  companyName: string;

  @Column("varchar", { length: 50, nullable: true })
  @IsOptional()
  @IsUrl()
  webPage: string;

  @Column("varchar", { length: 50, nullable: true })
  @IsOptional()
  @IsUrl()
  instagram: string;

  @Column("varchar", { length: 50, nullable: true })
  @IsOptional()
  @IsUrl()
  facebook: string;

  @OneToOne(() => User, (user) => user.vendor)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  @IsOptional()
  userId: string;

  @ManyToMany(() => District, (district) => district.vendor)
  servedDistrict: District[];

  @OneToOne(() => Portfolio, (prices) => prices.vendor)
  portfolio: Relation<Portfolio>;

  @OneToOne(() => Schedule, (schedule) => schedule.vendor)
  schedule: Relation<Schedule>;

  @OneToMany(() => Event, (event) => event.client)
  events: Event[];
}

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  district: string;

  @ManyToMany(() => Vendor, (vendor) => vendor.servedDistrict)
  @JoinTable()
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

  @OneToMany(
    () => WeekdayAvailability,
    (weekdayAvailability) => weekdayAvailability.schedule
  )
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
