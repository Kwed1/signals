import PinnedMessage from 'entities/PinnedMessage/PinnedMessage';
import styles from './index.module.scss';
import homeicon from 'assets/icons/home.svg';
import Search from 'entities/Search/Search';
import subIcon from 'assets/icons/filter-sub.svg';
import contactIcon from 'assets/icons/filter-contact.svg';
import Switch from 'entities/Switch/Switch';
import Message from 'entities/Message/Message';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import useChannelsStore from 'shared/store/useChannelsStore';
import useTokenStore from 'shared/store/useTokenStore';
import { Channel } from 'shared/types';
import useApi from 'shared/utils/ApiResponseHandler';
import MessagesContainer from 'entities/MessagesContainer/MessagesContainer';

export default function Homepage() {

	const { setChannels } = useChannelsStore();
   const { getToken } = useTokenStore();
   let _accessToken = getToken();
   const api = useApi();

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
				<NavLink to={'/channels'} className={styles.icon}>
					<img width={23} height={23} src={homeicon} alt="" />
				</NavLink>
				{/* <Profile />
				<Icon id={'profile-icon'} className={styles.profileIcon} size={28} color='transparent' lineColor='#fff'/> */}
			</div>
			<div className={styles.pinned}>
				<PinnedMessage/>
			</div>
			<Search/>
			<div className={styles.filters}>
				<div className={styles.filter}>
					<img width={22} height={19} src={subIcon} alt="" />
					<p>Subscription</p>
				</div>
				<div className={styles.filter}>
					<img width={22} height={19} src={contactIcon} alt="" />
					<p>Contacts</p>
				</div>
				<div className={styles.switchFilter}>
					<Switch/>
				</div>
			</div>
			<MessagesContainer channel_id={123}/>
		</div>
	)
}