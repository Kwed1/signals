import defiIcon from 'assets/icons/defi-icon.png';
import pdIcon from 'assets/icons/pd-icon.png';
import setupIcon from 'assets/icons/setup-icon.png';
import signalsIcon from 'assets/icons/signals-icon.png';
import ChannelButton from 'entities/ChannelButton/ChannelButton';
import styles from './Navbar.module.scss';
import { useLocation } from 'react-router-dom';

export default function Navbar() {

   const location = useLocation();

   return (
      <>
         <div className={`${styles.pad} ${location.pathname === '/create-channel2' ? styles.color : ''}`}></div>
         <div className={styles.channels}>
            <ChannelButton
               name='Home'
               icon={'home'}
               current={true}
            />
            <ChannelButton
               name='Setup'
               icon={'channels'}
            />
            <ChannelButton
               name='P&D'
               icon={'arrows'}
            />
            <ChannelButton
               name='Defi'
               icon={'arrows'}
            />
         </div>
      </>
   );
}
