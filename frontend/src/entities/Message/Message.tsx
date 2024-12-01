import useTokenStore from 'shared/store/useTokenStore';
    import styles from './Message.module.scss';
import useApi from 'shared/utils/ApiResponseHandler';
import useChannelsStore from 'shared/store/useChannelsStore';
import { useEffect, useState } from 'react';
import { Attachment, Channel } from 'shared/types';
import useModalsStore from 'shared/store/useModalsStore';

interface MessageProps {
    text: string;
    style: 'left' | 'right'
    specialStyle?: boolean;
    canPin?: boolean;
    id: number;
    attachments: Attachment[];
}

export default function Message({text, style, specialStyle, canPin, id}: MessageProps) {

    const [pinned, setPinned] = useState<boolean>(false);
    const {getToken} = useTokenStore();
    const {selectedChannel, updateChannelById, updateSelected} = useChannelsStore();
    const { setPinModalOpen } = useModalsStore();
    let _accessToken = getToken();
    const api = useApi();

    const pinMessage = async() => {
        if(!canPin) return;
        if(!_accessToken) return;
        const res = await api<Channel>({url: `/channel/${selectedChannel?.channel_id}/message/${id}/pinned`, method: 'PATCH'});
        if(res) {
            updateChannelById(Number(selectedChannel?.channel_id), res);
            updateSelected(res);
            setPinModalOpen(false);
        }
    }

    useEffect(() => {
        if(selectedChannel && selectedChannel.pinned_message && selectedChannel.pinned_message.message_id === id) {
            setPinned(true)
        }
    }, [])

    return (
        <div className={`${styles.message} ${style === 'left' ? styles.notmy : styles.my} ${specialStyle ? styles.special : ''} ${pinned && styles.pinned}`} onClick={pinMessage} >
            <p style={{whiteSpace: 'pre-line', padding: '10px'}}>{text}</p>
        </div>
    )
}