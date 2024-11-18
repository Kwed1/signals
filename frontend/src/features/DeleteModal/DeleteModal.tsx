import useModalsStore from 'shared/store/useModalsStore';
import styles from './DeleteModal.module.scss';

export default function DeleteModal() {

    const {setDeleteModalOpen} = useModalsStore();

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
                <button className={styles.delete}>Delete</button>
            </div>
        </div>
    )
}