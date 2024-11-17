import styles from './ChannelCard.module.scss';

export default function ChannelCard() {
    return (
        <div className={styles.ChannelCard}>
            <div className={styles.imageWrapper}><div className={styles.image}></div></div>
            <div className={styles.info}>
                <p className={styles.channelName}>Crypto Insights</p>
                <p className={styles.lastMess}>Ethereum is showing strong growth, and analysts predict that the price could reach $2,500 in the c...</p>
            </div>
        </div>
    )
}