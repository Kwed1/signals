import Icon from '../Icon/Icon'
import styles from './AdminNav.module.scss'
import {NavLink} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function AdminNav() {
    
    const location = useLocation();

    return (
        <>
            <div className={`${styles.pad} ${location.pathname === '/create-channel2' ? styles.color : ''}`}></div>
            <div className={styles.panel}>
                <NavLink to={'/'} className={`${styles.navbtn}`}>
                    <Icon size={22} className={styles.icon} id='home' lineColor='#FFCC00'/>
                    <span>Home</span>
                </NavLink>
                <NavLink to={'/channels'} className={`${styles.navbtn} ${location.pathname === '/channels' ? styles.current : ''}`}>
                    <Icon size={22} className={styles.icon} id='channels' lineColor={location.pathname === '/channels' ? "#171A1F" : '#FFCC00'}/>
                    <span>Channels</span>
                </NavLink>
                <NavLink to={'/users'} className={`${styles.navbtn} ${location.pathname === '/users' ? styles.current : ''}`}>
                    <Icon size={22} className={styles.icon} id='add-square' lineColor={location.pathname === '/users' ? "#171A1F" : '#FFCC00'}/>
                    <span>Users</span>
                </NavLink>
            </div>
        </>
    )
}