import React from 'react';
import useModalsStore from 'shared/store/useModalsStore';
import styles from './ChannelData.module.scss';
import useChannelsStore from 'shared/store/useChannelsStore';
import Icon from 'shared/ui/Icon/Icon';

interface ChannelDataProps {
   name: string;
   onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   icon: string;
}

export default function ChannelData({ name, onNameChange }: ChannelDataProps) {
   const { setIconModalOpen } = useModalsStore();
   const {editing, selectedChannel} = useChannelsStore();

   const icon = () => {
      if(editing && selectedChannel && selectedChannel.icon_type) {
         return selectedChannel.icon_type;
      } else if(!editing && selectedChannel && selectedChannel.icon_type) {
         return selectedChannel.icon_type;
      } else {
         return 'gallery'
      }
   }

   return (
      <div className={styles.channelData}>
         <button
            className={styles.imageWrapper}
            onClick={() => setIconModalOpen(true)}
         >
            <Icon
               className={styles.icon}
               id={icon()}
            />
         </button>
         <input
            className={styles.channelName}
            type='text'
            placeholder='Channel name'
            maxLength={25}
            value={name}
            onChange={onNameChange}
         />
      </div>
   );
}
