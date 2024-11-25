import galleryIcon from 'assets/icons/gallery-import.svg';
import React from 'react';
import styles from './ChannelData.module.scss';

interface ChannelDataProps {
   name: string;
   onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChannelData({ name, onNameChange }: ChannelDataProps) {
   return (
      <div className={styles.channelData}>
         <div className={styles.imageWrapper}>
            <input
               className={styles.inputFile}
               type='file'
            />
            <img
               src={galleryIcon}
               alt=''
            />
         </div>
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
