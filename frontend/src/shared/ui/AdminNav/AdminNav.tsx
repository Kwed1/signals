import Icon from '../Icon/Icon'
import styles from './AdminNav.module.scss'

export default function AdminNav() {
    
    const location2 = '/admin';

    return (
        <>
            <div className={styles.panel}>
                <button className={`${styles.navbtn} ${location2 === '/admin' ? styles.current : ''}`}>
                    <Icon size={22} className={styles.icon} id='add-square' lineColor={location2 === '/admin' ? "#171A1F" : '#FFCC00'}/>
                    <span>Channels</span>
                </button>
                <button className={`${styles.navbtn}`}>
                    <Icon size={22} className={styles.icon} id='channels' lineColor='#FFCC00'/>
                    <span>Users</span>
                </button>
            </div>
            <div className={`${styles.pad} ${location.pathname === '/create-channel2' ? styles.color : ''}`}></div>
        </>
    )
}