import styles from './ButtonStyle.module.scss';
import React from "react";

type TypeButtonProps = 'submit' | 'reset' | 'button';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: TypeButtonProps;
    disabled?: boolean;
    style?: React.CSSProperties;
}

export default function Button({
    text,
    onClick,
    type = 'button',
    disabled = false,
    style,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            title={text}
            className={styles.customButton}
            disabled={disabled}
            style={style}
        >
            {text}
        </button>
    )
}