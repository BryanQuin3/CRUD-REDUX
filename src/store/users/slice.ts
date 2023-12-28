import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}

export const DEFAULT_STATE =[
    {
        id: "1",
        name: "Peter Doe",
        email: "peter@gmail.com",
        github: "peterdoe",
    },
    {
        id: "2",
        name: "Lena Whitehouse",
        email: "lena@gmail.com",
        github: "lenawhite",
    },
    {
        id: "3",
        name: "Phil Less",
        email: "ph@gmail.com",
        github: "philess",
    },
    {
        id: "4",
        name: "John Camper",
        email: "jh@gmail.com",
        github: "johncamper",
    },
    {
        id: "5",
        name: "Danny Strong",
        email: "danny@gmail.com",
        github: "dannystrong",
    },
    {
        id: "6",
        name: "Rebecca Manes",
        email: "rebe@gmail.com",
        github: "rebeccamanes",
    }
];

const initialState: UserWithId[] =  (()=>{
    const persistedState = localStorage.getItem("store-state");
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})()

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        deleteUserById:(state,action:PayloadAction<UserId>)=>{
            const id = action.payload;
            return state.filter((user)=>user.id !== id);
        },
        addUser:(state,action:PayloadAction<User>)=>{
            const id = crypto.randomUUID();
            return [...state,{id,...action.payload}]
        },
        editUser:(state,action:PayloadAction<UserWithId>)=>{
            const id = action.payload.id;
            return state.map((user)=>user.id === id ? action.payload : user);
        },
        rollbackUser:(state,action:PayloadAction<UserWithId>)=>{
            const isUserExist = state.find((user)=>user.id === action.payload.id);
            if(!isUserExist) {
                return [...state,action.payload];
            }
        
        }
    }
});

export default usersSlice.reducer;
export const { deleteUserById, addUser,editUser,rollbackUser } = usersSlice.actions;