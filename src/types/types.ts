import {User, Client, Vendor} from "../entity/Entities"

// export type UserUnion = User & Partial<Client> & Partial<Vendor> & {passwordConfirm: string}

export type HydratedUser = Omit<User, "client" | "vendor" | "password"> & {client?: Partial<Client>, vendor?: Partial<Vendor>, password? : string} 

export type FlattenedUser = Omit<User, "client" | "vendor" | "password" | "passwordConfirm"> & Client & Vendor & {password?: string; passwordConfirm?: string}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
