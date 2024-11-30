import contactIcon from 'assets/icons/filter-contact.svg'
import subIcon from 'assets/icons/filter-sub.svg'
import homeicon from 'assets/icons/home.svg'
import MessagesContainer from 'entities/MessagesContainer/MessagesContainer'
import PinnedMessage from 'entities/PinnedMessage/PinnedMessage'
import Search from 'entities/Search/Search'
import Switch from 'entities/Switch/Switch'
import Profile from 'features/Profile/Profile'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useChannelsStore from 'shared/store/useChannelsStore'
import useTokenStore from 'shared/store/useTokenStore'
import useUserStore from 'shared/store/useUserStore'
import { Channel, Direction, Message } from 'shared/types'
import Icon from 'shared/ui/Icon/Icon'
import Navbar from 'shared/ui/Navbar/Navbar'
import useApi from 'shared/utils/ApiResponseHandler'
import styles from './index.module.scss'

export default function Homepage() {
   const [search, setSearch] = useState<string>('');
   const [messages, setMessages] = useState<Message[]>([]);
   const [currentTab, setCurrentTab] = useState<number | null>(null);
   const [direction, setDirection] = useState<Direction>(Direction.LONG);
   const { setChannels, channels } = useChannelsStore();
   const { getToken } = useTokenStore();
   const {userData} = useUserStore();
   let _accessToken = getToken();
   const navigate = useNavigate();
   const api = useApi();

   const currentChannel = channels.find(channel => channel.channel_id === currentTab);

   const fetchChannels = async () => {
      const res = await api<Channel[]>({ url: '/channel/', method: 'GET' });
      if (res) {
         setChannels(res);
      }
   };

   useEffect(() => {
      if (_accessToken) {
         fetchChannels();
      }
   }, [_accessToken]);

   return (
      <div className={styles.homepage}>
         <div className={styles.top}>
            {userData && userData.is_admin ? (      
               <NavLink
                  to={'/channels'}
                  className={styles.icon}
               >
                  <img
                     width={23}
                     height={23}
                     src={homeicon}
                     alt=''
                  />
               </NavLink>
            ) : (
               <>
                  <Profile />
                  <Icon id={'profile-icon'} className={styles.profileIcon} size={28} color='transparent' lineColor='#fff'/>
               </>
            )}
         </div>
         <div className={styles.pinned}>
            {currentChannel && currentChannel.pinned_message && (
               <PinnedMessage currentTab={currentTab}/>
            )}
         </div>
         <Search
            value={search}
            onChange={e => setSearch(e.target.value)}
         />
         <div className={styles.filters}>
            <div className={styles.filter} onClick={() => _accessToken && navigate('/packages')}>
               <img
                  width={22}
                  height={19}
                  src={subIcon}
                  alt=''
               />
               <p>Subscription</p>
            </div>
            <div className={styles.filter}>
               <img
                  width={22}
                  height={19}
                  src={contactIcon}
                  alt=''
               />
               <p>Contacts</p>
            </div>
            <div className={styles.switchFilter}>
               <Switch direction={direction} setDirection={setDirection}/>
            </div>
         </div>
         <MessagesContainer channel_id={currentTab} search={search} messages={messages} setMessages={setMessages} direction={direction}/>
         <Navbar changePage={setCurrentTab} page={currentTab}/>
      </div>
   );
}
