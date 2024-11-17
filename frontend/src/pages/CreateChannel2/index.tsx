import Message from 'entities/Message/Message';
import ChannelData from 'features/ChannelData/ChannelData';
import PageHeading from 'shared/ui/PageHeading/PageHeading';
import PinButton from 'shared/ui/PinButton/PinButton';
import styles from './CreateChannel2.module.scss';

export default function CreateChannel2() {
   return (
      <div className={styles.CreateChannel2}>
         <div className={styles.top}>
            <PageHeading text='Create a channel' />
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
   );
}
