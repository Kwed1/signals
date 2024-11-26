import ChannelButton from 'entities/ChannelButton/ChannelButton';
import styles from './Navbar.module.scss';
import { useLocation } from 'react-router-dom';
import useChannelsStore from 'shared/store/useChannelsStore';

export default function Navbar() {

   const location = useLocation();
   const {channels} = useChannelsStore();
   let pathname = location.pathname;
   
   if(pathname === '/create-channel' || pathname === '/channels' || pathname === '/users' || pathname === '/update-channel') {
      return null;
   }

   return (
      <>
         <div className={`${styles.pad}`}></div>
         <div className={styles.channels}>
            {channels && channels.map(channel => (
               <ChannelButton key={channel.channel_id} name={channel.name} icon={channel.icon_type}/>
            ))}
         </div>
      </>
   );
}
