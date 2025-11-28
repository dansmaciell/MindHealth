import styles from './InputStyle.module.scss';

type TypeInputProps = 'text' | 'password' | 'email' | 'number';

interface InputProps {
    placeholder?: string;
    type?: TypeInputProps;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export default function Input({
    placeholder,
    type = 'text',
    value,
    onChange,
    required = false,
    className,
}: InputProps) {
    return (
        <div>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                className={`${styles.customInput} ${className}`}
                required={required}
            />
        </div>
    );
}
