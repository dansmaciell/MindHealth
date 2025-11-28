import styles from './FeedbackStyle.module.scss'

interface FeedbackProps {
    text: string;
    textColor?: string;
    color: string;
    width: number;
    height: number;
}

export default function Feedback({
    text,
    textColor,
    color,
    width,
    height
}: FeedbackProps) {
    return (
        <div
            className={styles.feedback}
            style={{
                backgroundColor: color,
                color: textColor,
                width: width,
                height: height,
            }}
        >
            {text}
        </div>
    );
}