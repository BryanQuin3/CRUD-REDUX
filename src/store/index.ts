import { configureStore,type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser, User, UserId, UserWithId } from "./users/slice";
import { postUser,removeUser,updateUser } from "../services";

const persitanceLocalStorageMiddleware : Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("store-state", JSON.stringify(store.getState()));
}

interface ActionWithPayload {
    type: string;
    payload: string & User & UserId & UserWithId;
}

const syncWithDatabaseMiddleware : Middleware = (store) => (next) => (action) => {
    const { type, payload } = action as ActionWithPayload;
    const previosState = store.getState();
    next(action);

    if(type === "users/addUser") {
        postUser(payload)
        .catch(() => {
            store.dispatch(rollbackUser(payload));
        });
    }

    if(type === "users/deleteUserById") {
        const userToRemove = previosState.users.find((user: UserWithId) => user.id === payload);
        removeUser(payload)
            .catch(() => {
                if (userToRemove) store.dispatch(rollbackUser(userToRemove));
            });
    }
    if(type === "users/editUser") {
        updateUser(payload)
            .catch(() => {
                store.dispatch(rollbackUser(payload));
            });
    }
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persitanceLocalStorageMiddleware).concat(syncWithDatabaseMiddleware)
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;