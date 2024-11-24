import Icon from 'shared/ui/Icon/Icon';
import styles from './ChannelButton.module.scss';

interface ChannelButtonProps {
    name: string;
    icon: string;
    current?: boolean;
}

export default function ChannelButton({name, icon, current = false}: ChannelButtonProps) {
    return (
        <button className={`${styles.channel} ${current ? styles.current : ''}`}>
            <Icon className={styles.icon} id={icon} color='transparent' lineColor={current ? '#171A1F' : '#FFCC00'}/>
            <span>{name}</span>
        </button>
    )
}