import {User, Client, Vendor} from "../entity/Entities"

export type UserUnion = User & Partial<Client> & Partial<Vendor> & {passwordConfirm: string}

export type HydratedUser = Omit<User, "client" | "vendor"> & {client: Partial<Client>, vendor: Partial<Vendor>} 