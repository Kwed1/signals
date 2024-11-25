import Message from 'entities/Message/Message';
import useModalsStore from 'shared/store/useModalsStore';
import Icon from 'shared/ui/Icon/Icon';
import styles from './PinModal.module.scss';

export default function PinModal() {
   const { setPinModalOpen } = useModalsStore();

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
         <div className={styles.messages}>
            <Message
               text='Message...'
               my={true}
            />
            <Message
               text='Message...'
               my={false}
            />
            <Message
               text='Message...'
               my={true}
            />
            <Message
               text='Message...'
               my={false}
            />
            <Message
               text='Message...'
               my={true}
            />
            <Message
               text='Message...'
               my={false}
            />
            <Message
               text='Message...'
               my={true}
            />
            <Message
               text='Message...'
               my={false}
            />
            <Message
               text='Message...'
               my={true}
            />
            <Message
               text='Message...'
               my={false}
            />
            <Message
               text='Message...'
               my={true}
            />
            <Message
               text='Message...'
               my={false}
            />
         </div>
      </div>
   );
}
