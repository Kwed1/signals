import ChannelData from 'features/ChannelData/ChannelData';
import styles from './CreateChannel.module.scss';
import CopyElement from 'features/CopyElement/CopyElement';
import PageHeading from 'shared/ui/PageHeading/PageHeading';
import PinButton from 'shared/ui/PinButton/PinButton';

export default function CreateChannel() {
   return (
      <div className={styles.CreateChannel}>
         <PageHeading text='Create a channel'/>
         <ChannelData />
         <PinButton/>
         <div className={styles.copy}>
            <CopyElement name='Channel Link' text='t.me/DnTyXst8UMASmJvt'/>
            <CopyElement name='Channel ID' text='1001234567890'/>
            <CopyElement name='Admin link' text='t.me/DnTyXst8UMASmJvt'/>
         </div>
         <button className={styles.createBtn}>Create</button>
      </div>
   );
}
