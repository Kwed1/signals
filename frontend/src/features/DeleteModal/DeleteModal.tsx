import useModalsStore from 'shared/store/useModalsStore';
import styles from './DeleteModal.module.scss';
import useTokenStore from 'shared/store/useTokenStore';
import useApi from 'shared/utils/ApiResponseHandler';
import useChannelsStore from 'shared/store/useChannelsStore';

export default function DeleteModal() {

    const {selectedChannel, deleteChannel} = useChannelsStore();
    const {setDeleteModalOpen, setChoiceModalOpen} = useModalsStore();
    const {getToken} = useTokenStore();
    let _accessToken = getToken();
    const api = useApi();

    const deleteChannelAsync = async() => {
        if(!selectedChannel) return;
        if(!_accessToken) return;
        const res = await api({url: `/channel/${selectedChannel.channel_id}`, method: "DELETE"});
        if(res) {
            setDeleteModalOpen(false);
            setChoiceModalOpen(false);
            deleteChannel(selectedChannel.channel_id);
        }
    }

    return (
        <div className={styles.modal}>
            <h3>Delete level</h3>
            <p>Are you sure you want to delete this level? When deleted, all associated data will be permanently lost and cannot be recovered.</p>
            <div className={styles.buttons}>
                <button 
                    className={styles.cancel}
                    onClick={() => setDeleteModalOpen(false)}
                >
                    Cancel
                </button>
                <button className={styles.delete} onClick={deleteChannelAsync}>Delete</button>
            </div>
        </div>
    )
}