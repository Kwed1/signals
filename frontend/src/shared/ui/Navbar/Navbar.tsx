import ChannelButton from 'entities/ChannelButton/ChannelButton';
import styles from './Navbar.module.scss';
import { useLocation } from 'react-router-dom';

export default function Navbar() {

   const location = useLocation();
   let pathname = location.pathname;

   if(pathname === '/create-channel' || pathname === '/create-channel2' || pathname === '/channels' || pathname === '/users') {
      return null;
   }

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
