
type InputProps = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, value, onChange }: InputProps) => {
    return (
        <input type="text" name={name}
            className="border-2 border-blue-200 rounded-md pl-2"
            value={value}
            onChange={onChange}
        />
    )
}