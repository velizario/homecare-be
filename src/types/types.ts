import {User, Client, Vendor} from "../entity/Entities"

export type UserUnion = User & Partial<Client> & Partial<Vendor> & {passwordConfirm: string}

export type HydratedUser = Omit<User, "client" | "vendor"> & {client: Partial<Client>, vendor: Partial<Vendor>} 

export type FlattenedUser = Omit<User, "client" | "vendor" | "password" | "passwordConfirm"> & Client & Vendor

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
