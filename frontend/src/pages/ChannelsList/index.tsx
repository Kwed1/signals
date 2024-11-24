import ChannelCard from 'entities/ChannelCard/ChannelCard';
import Search from 'entities/Search/Search';
import ChoiceModal from 'features/ChoiceModal/ChoiceModal';
import DeleteModal from 'features/DeleteModal/DeleteModal';
import useModalsStore from 'shared/store/useModalsStore';
import styles from './ChannelsList.module.scss';
import Icon from 'shared/ui/Icon/Icon';

export default function ChannelsList() {
   const { choiceModalOpen, deleteModalOpen } = useModalsStore();
   return (
      <>
         <div className={styles.ChannelsList}>
            <div className={styles.top}>
               <p className={styles.pageHeading}>Channels</p>
               <Icon size={23} className={styles.addIcon} id='add-square' color='transparent'/>
            </div>
            <Search />
            <div className={styles.list}>
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
            </div>
         </div>
         {choiceModalOpen && <ChoiceModal />}
         {deleteModalOpen && <DeleteModal />}
      </>
   );
}
