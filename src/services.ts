import { END_POINT } from "./constants";
import { User, UserId, UserWithId} from "./store/users/slice";
import { toast } from "sonner";

export const postUser = async (user: User) => {
    try {
        const response = await fetch(END_POINT, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        toast.success("User created successfully");
    } catch (err) {
        toast.error(`Something went wrong while creating user ${user.name}: ${err}`);
        throw err;
    }
};


export const removeUser = async (userId: UserId) => {
    try {
        const response = await fetch(`${END_POINT}/${userId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        toast.success("User deleted successfully");
    } catch (err) {
        toast.error(`Something went wrong while deleting user: ${err}`);
        throw err;
    }
};

export const updateUser = async (user: UserWithId) => {
    try {
        const response = await fetch(`${END_POINT}/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        toast.success("User updated successfully");
    } catch (err) {
        toast.error(`Something went wrong while updating user ${user.name}: ${err}`);
        throw err;
    }
}