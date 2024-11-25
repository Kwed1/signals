import Message from 'entities/Message/Message';
import ChannelData from 'features/ChannelData/ChannelData';
import PinButton from 'shared/ui/PinButton/PinButton';
import styles from './CreateChannel2.module.scss';
import AdminNav from 'shared/ui/AdminNav/AdminNav';

export default function CreateChannel2() {
   return (
      <>
         <div className={styles.CreateChannel2}>
            <div className={styles.top}>
               <p className={styles.pageHeading}>Create a channel</p>
               <ChannelData />
               <PinButton />
            </div>
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
         <AdminNav/>
      </>
   );
}
