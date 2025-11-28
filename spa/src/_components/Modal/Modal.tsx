import React from "react";
import styles from "./ModalStyle.module.scss";

interface ModalProps {
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    modalStyle?: React.CSSProperties;
}

export default function Modal({ onClose, title, children, modalStyle }: ModalProps) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                style={modalStyle}
            >
                {title && <h2 className={styles.title}>{title}</h2>}
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}