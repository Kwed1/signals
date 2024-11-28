import styles from './Message.module.scss';

interface MessageProps {
    text: string;
    style: 'left' | 'right'
    specialStyle?: boolean;
}

export default function Message({text, style, specialStyle}: MessageProps) {
    return (
        <div className={`${styles.message} ${style === 'left' ? styles.notmy : styles.my} ${specialStyle ? styles.special : ''}`}>
            {text}
        </div>
    )
}