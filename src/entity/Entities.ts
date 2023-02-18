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
  Timestamp,
  OneToMany,
  Relation,
} from "typeorm";

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
  firstName: string;

  @Column("varchar", { length: 30 })
  lastName: string;

  @Column("varchar", { length: 100, nullable: true })
  imageUrl: string;

  @Column("varchar", { length: 50 })
  email: string;

  @Column("varchar", { length: 30 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Client, (client) => client.user)
  client: Relation<Client>;

  @OneToOne(() => Vendor, (vendor) => vendor.user)
  vendor: Relation<Vendor>;
}

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn()
  user: User;

  @OneToMany(() => Event, (event) => event.client)
  events: Event[];
}

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, (user) => user.vendor)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Districts, (district) => district.assignedVendors)
  servedDistricts: Districts[];

  @OneToOne(() => Portfolio, (prices) => prices.vendor)
  portfolio: Relation<Portfolio>;

  @OneToOne(()=> Schedule, (schedule) => schedule.vendor)
  schedule: Relation<Schedule>;

  @OneToMany(() => Event, (event) => event.client)
  events: Event[];
}

@Entity()
export class Districts {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  district: string;

  @ManyToMany(() => Vendor, (vendor) => vendor.servedDistricts)
  @JoinTable()
  assignedVendors: Vendor[];
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

  @Column("date", {array: true})
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
