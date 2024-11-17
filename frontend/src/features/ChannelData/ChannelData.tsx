import styles from './ChannelData.module.scss';
import galleryIcon from 'assets/icons/gallery-import.svg';
    
export default function ChannelData() {
    return (
        <div className={styles.channelData}>
            <div className={styles.imageWrapper}>
                <input className={styles.inputFile} type="file" />
                <img src={galleryIcon} alt="" />
            </div>
            <input className={styles.channelName} type="text" placeholder='Channel name'/>
        </div>
    )
}