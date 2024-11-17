import ChannelData from 'features/ChannelData/ChannelData';
import styles from './CreateChannel.module.scss';
import CopyElement from 'features/CopyElement/CopyElement';

export default function CreateChannel() {
   return (
      <div className={styles.CreateChannel}>
         <h3 className={styles.heading}>Create a channel</h3>
         <ChannelData />
         <button className={styles.pinBtn}>Pin this post</button>
         <div className={styles.copy}>
            <CopyElement name='Channel Link' text='t.me/DnTyXst8UMASmJvt'/>
            <CopyElement name='Channel ID' text='1001234567890'/>
            <CopyElement name='Admin link' text='t.me/DnTyXst8UMASmJvt'/>
         </div>
         <button className={styles.createBtn}>Create</button>
      </div>
   );
}
