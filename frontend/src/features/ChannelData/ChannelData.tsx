import galleryIcon from 'assets/icons/gallery-import.svg';
import React from 'react';
import useModalsStore from 'shared/store/useModalsStore';
import styles from './ChannelData.module.scss';
import useChannelsStore from 'shared/store/useChannelsStore';
import Icon from 'shared/ui/Icon/Icon';

interface ChannelDataProps {
   name: string;
   onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChannelData({ name, onNameChange }: ChannelDataProps) {
   const { setIconModalOpen } = useModalsStore();
   const {selectedIcon} = useChannelsStore();

   return (
      <div className={styles.channelData}>
         <button
            className={styles.imageWrapper}
            onClick={() => setIconModalOpen(true)}
         >
            <Icon
               className={styles.icon}
               id={selectedIcon ? selectedIcon : 'gallery'}
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
