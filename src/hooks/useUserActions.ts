import { useAppDispatch } from "../hooks/store";
import { deleteUserById,addUser,editUser } from "../store/users/slice";
import { UserId } from "../store/users/slice";
export const useUserActions = () => {
    const dispatch = useAppDispatch();
    const removeUser = (id: UserId) => {
        dispatch(deleteUserById(id));
    };

    const addNewUser = (name: string, email: string, github: string) => {
        dispatch(addUser({name,email,github}));
    }

    const editCurrentUser = (id: UserId, name: string, email: string, github: string) => {
         dispatch(editUser({id,name,email,github}));
    }

    return { removeUser,addNewUser,editCurrentUser };
};