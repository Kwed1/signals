import ChannelCard from 'entities/ChannelCard/ChannelCard';
import Search from 'entities/Search/Search';
import ChoiceModal from 'features/ChoiceModal/ChoiceModal';
import DeleteModal from 'features/DeleteModal/DeleteModal';
import useModalsStore from 'shared/store/useModalsStore';
import styles from './ChannelsList.module.scss';
import Icon from 'shared/ui/Icon/Icon';
import AdminNav from 'shared/ui/AdminNav/AdminNav';
import { NavLink } from 'react-router-dom';
import useChannelsStore from 'shared/store/useChannelsStore';
import useTokenStore from 'shared/store/useTokenStore';
import useApi from 'shared/utils/ApiResponseHandler';
import { Channel } from 'shared/types';
import { useEffect } from 'react';

export default function ChannelsList() {
   const { choiceModalOpen, deleteModalOpen } = useModalsStore();
   const {channels, setChannels} = useChannelsStore();
   const {getToken} = useTokenStore();
   let _accessToken = getToken();
   const api = useApi();

   const fetchChannels = async () => {
      const res = await api<Channel[]>({url: '/channel/', method: "GET"});
      if(res) {
         setChannels(res);
      }
   }

   useEffect(() => {
      if(channels.length > 0) return;
      if(_accessToken) {
         fetchChannels();
      }
   }, [_accessToken])

   return (
      <>
         <div className={styles.ChannelsList}>
            <div className={styles.top}>
               <p className={styles.pageHeading}>Channels</p>
               <NavLink to={'/create-channel'} className={styles.addIcon}>
                  <Icon size={23} className={styles.icon} id='add-square' color='transparent'/>
               </NavLink>
            </div>
            <Search />
            <div className={styles.list}>
               {channels.map(channel => (
                  <ChannelCard key={channel.channel_id} name={channel.name} icon_type={channel.icon_type} admin_id={channel.admin_id} channel_id={channel.channel_id} link={channel.link}/>
               ))}
               {channels.length === 0 && <p className={styles.empty}>Channels list empty</p>}
            </div>
         </div>
         {choiceModalOpen && <ChoiceModal />}
         {deleteModalOpen && <DeleteModal />}
         <AdminNav/>
      </>
   );
}
