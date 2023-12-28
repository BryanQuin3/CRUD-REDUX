import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Title,
    Badge
} from "@tremor/react";
import { useAppSelector } from "../hooks/store";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";
import { UserId, UserWithId } from "../store/users/slice";
import { defaultUser, tableHeaders } from "../constants";
import { EditIcon, ConfirmIcon, RemoveIcon } from "../Icons";
import { Input } from "./Input";

export default function ListOfUsers() {
    const users = useAppSelector((state) => state.users);
    const { removeUser, editCurrentUser } = useUserActions()
    const [currentUser, setCurrentUser] = useState<UserWithId>(defaultUser);

    const handleEdit = (userId: UserId) => {
        const user = users.find((user) => user.id === userId);
        if (user) {
            setCurrentUser(user);
        }
    }

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Update the corresponding field in the state
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleEditConfirmation = () => {
        const { id, name, email, github } = currentUser;
        editCurrentUser(id, name, email, github);
        // Reset the editUser state to exit edit mode
        setCurrentUser(defaultUser);
    };


    return (
        <Card>
            <Title>
                Users
                <Badge className="bg-blue-100 rounded-full text-blue-600 ml-3">{users.length}</Badge>
            </Title>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((header, i) => (
                            <TableHeaderCell key={i}>{header}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody >
                    {users.map((user) => (
                        <TableRow className="hover:bg-blue-50" key={user.id + Date.now}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell className="flex gap-1 items-center">
                                <img className="w-8 h-8 rounded-full" src={`https://unavatar.io/${user.name}`} alt={user.name} />
                                {currentUser.id === user.id
                                    ?
                                    <Input name="name" value={currentUser.name}
                                        onChange={handleChanges} />
                                    : user.name}
                            </TableCell>
                            <TableCell>
                                {currentUser.id === user.id
                                    ?
                                    <Input name="email" value={currentUser.email}
                                        onChange={handleChanges} />
                                    : user.email}
                            </TableCell>
                            <TableCell>
                                {currentUser.id === user.id
                                    ?
                                    <Input name="github" value={currentUser.github}
                                        onChange={handleChanges} />
                                    : user.github}
                            </TableCell>
                            <TableCell className="flex items-center gap-4">
                                {currentUser.id !== user.id ?
                                    <button aria-label="editUser" onClick={() => handleEdit(user.id)}>
                                        <EditIcon />
                                    </button>
                                    :
                                    <button aria-label="confirmEdit"
                                        onClick={handleEditConfirmation}>
                                        <ConfirmIcon />
                                    </button>
                                }
                                <button aria-label="remove user" onClick={() => removeUser(user.id)}>
                                    <RemoveIcon />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card >
    );
}
