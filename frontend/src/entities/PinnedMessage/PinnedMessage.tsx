import useChannelsStore from 'shared/store/useChannelsStore';
import styles from './PinnedMessage.module.scss';
import close from 'assets/icons/add.svg';
import { useEffect, useState } from 'react';

interface PinnedMessageProps {
    currentTab: number | null;
}

export default function PinnedMessage({currentTab}: PinnedMessageProps) {

    const [text, setText] = useState<string | null>(null);
    const {channels} = useChannelsStore();
    const currentChannel = channels.find(channel => channel.channel_id === currentTab);

    useEffect(() => {
        if(currentChannel && currentChannel.pinned_message && currentChannel.pinned_message.text) {
            setText(currentChannel.pinned_message.text);
        }
    }, [currentTab, currentChannel])

    if(text === null) return null;

    return (
        <div className={styles.message}>
            <div>
                <div className={styles.photo}></div>
                <div className={styles.info}>
                    <h4>Pinned message</h4>
                    <p>{text}</p>
                </div>
            </div>
            <div className={styles.closeIcon}>
                <img width={34} height={34} src={close} alt="" />
            </div>
        </div>
    )
}