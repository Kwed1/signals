import useModalsStore from 'shared/store/useModalsStore'
import styles from './ChoiceModal.module.scss'

export default function ChoiceModal() {

    const {setDeleteModalOpen} = useModalsStore();

    return (
        <div className={styles.modal}>
            <button className={styles.delete} onClick={() => setDeleteModalOpen(true)}>Delete</button>
            <button className={styles.edit}>Edit</button>
        </div>
    )
}