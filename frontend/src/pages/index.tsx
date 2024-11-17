import PinnedMessage from 'entities/PinnedMessage/PinnedMessage';
import styles from './index.module.scss';
import homeicon from 'assets/icons/home.svg';
import Search from 'entities/Search/Search';
import subIcon from 'assets/icons/filter-sub.svg';
import contactIcon from 'assets/icons/filter-contact.svg';
import Switch from 'entities/Switch/Switch';
import Message from 'entities/Message/Message';

export default function Homepage() {
	return (
		<div className={styles.homepage}>
			<div className={styles.top}>
				<div className={styles.icon}>
					<img width={23} height={23} src={homeicon} alt="" />
				</div>
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