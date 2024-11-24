import styles from './Profile.module.scss';

export default function Profile() {
    return (
        <div className={styles.profile}>
            <div className={styles.avatar}></div>
            <p className={styles.nickname}>Vakulenko Stas</p>
        </div>
    )
}