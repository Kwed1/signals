import { Channel } from 'shared/types';
import styles from './ChannelCard.module.scss';
import useChannelsStore from 'shared/store/useChannelsStore';
import useModalsStore from 'shared/store/useModalsStore';
    
export default function ChannelCard({name, admin_id, channel_id, icon_type, link, last_message, pinned_message}: Channel) {

    const {selectedChannel, setSelected} = useChannelsStore();
    const {setChoiceModalOpen} = useModalsStore();
    
    const selectChannel = () => {
        if(selectedChannel && selectedChannel.channel_id === channel_id) {
            setSelected(null)
            setChoiceModalOpen(false);
        } else {
            setSelected({name, admin_id, channel_id, icon_type, link, last_message, pinned_message})
            setChoiceModalOpen(true);
        }
    }

    return (
        <div 
            className={`${styles.ChannelCard} ${channel_id === selectedChannel?.channel_id ? styles.selected : ''}`}
            onClick={() => selectChannel()}
        >
            <div className={styles.imageWrapper}><div className={styles.image}></div></div>
            <div className={styles.info}>
                <p className={styles.channelName}>{name}</p>
                <p className={styles.lastMess}>{last_message && last_message?.text.length > 34 ? `${last_message?.text.slice(0, 35)}...` : last_message?.text}</p>
            </div>
        </div>
    )
}