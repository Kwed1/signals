import ChannelCard from 'entities/ChannelCard/ChannelCard';
import Search from 'entities/Search/Search';
import ChoiceModal from 'features/ChoiceModal/ChoiceModal';
import DeleteModal from 'features/DeleteModal/DeleteModal';
import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useChannelsStore from 'shared/store/useChannelsStore';
import useModalsStore from 'shared/store/useModalsStore';
import useTokenStore from 'shared/store/useTokenStore';
import { Channel } from 'shared/types';
import AdminNav from 'shared/ui/AdminNav/AdminNav';
import Icon from 'shared/ui/Icon/Icon';
import useApi from 'shared/utils/ApiResponseHandler';
import styles from './ChannelsList.module.scss';

export default function ChannelsList() {
   const [search, setSearch] = useState<string>('');
   const { choiceModalOpen, deleteModalOpen } = useModalsStore();
   const { channels, setChannels } = useChannelsStore();
   const { getToken } = useTokenStore();
   let _accessToken = getToken();
   const api = useApi();

   const fetchChannels = async () => {
      const res = await api<Channel[]>({ url: '/channel/', method: 'GET' });
      if (res) {
         setChannels(res);
      }
   };

   const filteredChannels = useMemo(
      () =>
         channels.filter(channel =>
            channel.name.toLowerCase().includes(search.toLowerCase()),
         ),
      [channels, search],
   );

   useEffect(() => {
      if (channels.length > 0) return;
      if (_accessToken) {
         fetchChannels();
      }
   }, [_accessToken]);

   return (
      <>
         <div className={styles.ChannelsList}>
            <div className={styles.top}>
               <p className={styles.pageHeading}>Channels</p>
               <NavLink
                  to={'/create-channel'}
                  className={styles.addIcon}
               >
                  <Icon
                     size={23}
                     className={styles.icon}
                     id='add-square'
                     color='transparent'
                  />
               </NavLink>
            </div>
            <Search
               value={search}
               onChange={e => setSearch(e.target.value)}
            />
            <div className={styles.list}>
               {search.length === 0 ?
                  channels.map(channel => (
                     <ChannelCard
                        key={channel.channel_id}
                        name={channel.name}
                        icon_type={channel.icon_type}
                        admin_id={channel.admin_id}
                        channel_id={channel.channel_id}
                        link={channel.link}
                     />
                  )) : filteredChannels.map(channel => (
                     <ChannelCard
                        key={channel.channel_id}
                        name={channel.name}
                        icon_type={channel.icon_type}
                        admin_id={channel.admin_id}
                        channel_id={channel.channel_id}
                        link={channel.link}
                     />
                  ))}
               {channels.length === 0 && (
                  <p className={styles.empty}>Channels list empty</p>
               )}
            </div>
         </div>
         {choiceModalOpen && <ChoiceModal />}
         {deleteModalOpen && <DeleteModal />}
         <AdminNav />
      </>
   );
}
