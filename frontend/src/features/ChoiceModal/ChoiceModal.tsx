import useModalsStore from 'shared/store/useModalsStore'
import styles from './ChoiceModal.module.scss'
import { useNavigate } from 'react-router-dom';
import useChannelsStore from 'shared/store/useChannelsStore';

export default function ChoiceModal() {

    const {setDeleteModalOpen} = useModalsStore();
    const {selectedChannel, setEditing} = useChannelsStore();
    const navigate = useNavigate();

    return (
        <div className={styles.modal}>
            <button className={styles.delete} onClick={() => setDeleteModalOpen(true)}>Delete</button>
            <button className={styles.edit} onClick={() => {
                if(selectedChannel) navigate('/create-channel');
                setEditing(true);
            }}>Edit</button>
        </div>
    )
}