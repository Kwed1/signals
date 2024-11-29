import Icon from 'shared/ui/Icon/Icon';
import styles from './ChannelButton.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface ChannelButtonProps {
    name: string;
    icon: string;
    id: number;
    current?: boolean;
    onClick: Dispatch<SetStateAction<number | null>>;
}

export default function ChannelButton({name, icon, current = false, id, onClick}: ChannelButtonProps) {

    return (
        <button className={`${styles.channel} ${current ? styles.current : ''}`} onClick={() => onClick(id)}>
            <Icon className={styles.icon} id={icon} color='transparent' lineColor={current ? '#171A1F' : '#FFCC00'}/>
            <span>{name.length > 5 ? `${name.slice(0,5)}..` : name}</span>
        </button>
    )
}