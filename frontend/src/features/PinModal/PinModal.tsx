import useModalsStore from 'shared/store/useModalsStore';
import Icon from 'shared/ui/Icon/Icon';
import styles from './PinModal.module.scss';
import useChannelsStore from 'shared/store/useChannelsStore';
import MessagesContainer from 'entities/MessagesContainer/MessagesContainer';

export default function PinModal() {
   const { setPinModalOpen } = useModalsStore();
   const {selectedChannel} = useChannelsStore();

   return (
      <div className={styles.modal}>
         <button
            className={styles.closeBtn}
            onClick={() => setPinModalOpen(false)}
         >
            <Icon
               className={styles.close}
               id='close'
               size={34}
            />
         </button>
         <MessagesContainer channel_id={selectedChannel?.channel_id as number}/>
      </div>
   );
}
