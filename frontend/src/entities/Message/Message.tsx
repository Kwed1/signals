import styles from './Message.module.scss';

interface MessageProps {
    text: string;
    my: boolean;
}

export default function Message({text, my}: MessageProps) {
    return (
        <div className={`${styles.message} ${my ? styles.my : styles.notmy}`}>
            {text}
        </div>
    )
}