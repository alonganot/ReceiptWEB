import { User } from "./User";

export interface Item {
    name: string,
    price: number,
    payers: User[]
}