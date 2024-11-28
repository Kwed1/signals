import contactIcon from 'assets/icons/filter-contact.svg'
import subIcon from 'assets/icons/filter-sub.svg'
import homeicon from 'assets/icons/home.svg'
import Message from 'entities/Message/Message'
import PinnedMessage from 'entities/PinnedMessage/PinnedMessage'
import Search from 'entities/Search/Search'
import Switch from 'entities/Switch/Switch'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useChannelsStore from 'shared/store/useChannelsStore'
import useTokenStore from 'shared/store/useTokenStore'
import { Channel } from 'shared/types'
import useApi from 'shared/utils/ApiResponseHandler'
import styles from './index.module.scss'

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
	 const navigate = useNavigate()

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
				<button className={styles.filter}
				onClick={() => navigate('/packages')}>
					<img width={22} height={19} src={subIcon} alt="" />
					<p>Subscription</p>
				</button>
				<div className={styles.filter}>
					<img width={22} height={19} src={contactIcon} alt="" />
					<p>Contacts</p>
				</div>
				<div className={styles.switchFilter}>
					<Switch/>
				</div>
			</div>
			<div className={styles.messages}>
				<Message text='Message...' my={false}/>
				<Message text='Message...' my={true}/>
				<Message text='Message...' my={false}/>
				<Message text='Message...' my={true}/>
				<Message text='Message...' my={false}/>
				<Message text='Message...' my={true}/>
				<Message text='Message...' my={false}/>
				<Message text='Message...' my={true}/>
				<Message text='Message...' my={false}/>
				<Message text='Message...' my={true}/>
				<Message text='Message...' my={false}/>
			</div>
			
		</div>
	)
}