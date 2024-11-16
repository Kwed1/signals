import styles from './ChannelButton.module.scss';

interface ChannelButtonProps {
    name: string;
    icon: string;
    current?: boolean;
}

export default function ChannelButton({name, icon, current = false}: ChannelButtonProps) {
    return (
        <button className={`${styles.channel} ${current ? styles.current : ''}`}>
            <img src={icon} alt="" />
            <span>{name}</span>
        </button>
    )
}