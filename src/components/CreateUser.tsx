import { Button, Title, TextInput, Card } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
export const CreateUser = () => {
    const { addNewUser } = useUserActions();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const github = formData.get("github") as string;
        addNewUser(name, email, github);
        form.reset();
    };
    return (
        <Card className="mt-5">
            <Title>Create New User</Title>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
                <TextInput placeholder="Your Name" name="name" />
                <TextInput placeholder="Your Email" name="email" />
                <TextInput placeholder="Your github user" name="github" />
                <div>
                    <Button className="mt-4">Create User</Button>
                </div>
            </form>
        </Card>
    );
};