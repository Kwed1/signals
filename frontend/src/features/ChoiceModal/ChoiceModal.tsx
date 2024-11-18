import styles from './ChoiceModal.module.scss'

export default function ChoiceModal() {
    return (
        <div className={styles.modal}>
            <button className={styles.delete}>Delete</button>
            <button className={styles.edit}>Edit</button>
        </div>
    )
}