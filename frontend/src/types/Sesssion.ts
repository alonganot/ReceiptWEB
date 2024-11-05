import { Item } from "./Item";
import { User } from "./User";

export interface Session {
    _id: string,
    managerId: string,
    title: string,
    users: User[],
    items: Item[]
}