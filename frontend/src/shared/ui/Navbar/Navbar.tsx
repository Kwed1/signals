import defiIcon from 'assets/icons/defi-icon.png';
import pdIcon from 'assets/icons/pd-icon.png';
import setupIcon from 'assets/icons/setup-icon.png';
import signalsIcon from 'assets/icons/signals-icon.png';
import ChannelButton from 'entities/ChannelButton/ChannelButton';
import styles from './Navbar.module.scss';

export default function Navbar() {
   return (
      <>
         <div className={styles.pad}></div>
         <div className={styles.channels}>
            <ChannelButton
               name='Signals'
               icon={signalsIcon}
               current={true}
            />
            <ChannelButton
               name='Setup'
               icon={setupIcon}
            />
            <ChannelButton
               name='P&D'
               icon={pdIcon}
            />
            <ChannelButton
               name='Defi'
               icon={defiIcon}
            />
         </div>
      </>
   );
}
