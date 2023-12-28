import { UserWithId } from "./store/users/slice";

export const END_POINT = "https://jsonplaceholder.typicode.com/users";

export const defaultUser:UserWithId = { id: "", name: "", email: "", github: "" };

export const tableHeaders = ["Id","Name", "Email", "Github", "Actions"];