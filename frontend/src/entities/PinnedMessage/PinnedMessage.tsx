import styles from './PinnedMessage.module.scss';
import close from 'assets/icons/add.svg';

export default function PinnedMessage() {
    return (
        <div className={styles.message}>
            <div>
                <div className={styles.photo}></div>
                <div className={styles.info}>
                    <h4>Pinned message</h4>
                    <p>Title</p>
                </div>
            </div>
            <div className={styles.closeIcon}>
                <img width={34} height={34} src={close} alt="" />
            </div>
        </div>
    )
}