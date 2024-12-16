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
import logo from 'assets/app-logo.png';
import {initUtils} from '@tma.js/sdk';

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
   // const utils = initUtils();

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
         <div className={styles.wrapper}>
            <div className={styles.top}>
               {userData && userData.is_admin ? (      
                  <>
                     <img width={60} height={60} src={logo} alt="" />
                     <NavLink
                        to={'/channels'}
                        className={styles.icon}
                     >
                           <Icon className={styles.icon_home} id='admin_home' width={24} color='#000' lineColor='#000'/>
                     </NavLink>
                  </>
               ) : (
                  <>
                     <img width={60} height={60} src={logo} alt="" />
                     <div className={styles.left}>
                        <Profile />
                     </div>
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
               <button className={styles.filter} onClick={() => _accessToken && navigate('/packages')}>
                  <Icon className={styles.subscriptionIcon} id='card' width={24} height={24} color='#fff'/>
                  <p>Subscription</p>
               </button>
               <button className={styles.filter} onClick={() => {
                   console.log("Trying to open Telegram link");
                  if (currentChannel && currentChannel.admin_id) {
                     // utils.openTelegramLink(`${currentChannel.admin_id}`);
                  }
               }}>
                  <Icon className={styles.contactsIcon} id='card_id' width={24} height={24} color='#fff'/>
                  <p>Contacts</p>
               </button>
               <div className={styles.switchFilter}>
                  <Switch direction={direction} setDirection={setDirection}/>
               </div>
            </div>
            <MessagesContainer channel_id={currentTab} search={search} messages={messages} setMessages={setMessages} direction={direction}/>
         </div>
         <Navbar changePage={setCurrentTab} page={currentTab}/>
      </div>
   );
}
