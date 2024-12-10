import caret_left from 'assets/icons/sprites/icons/channels/caret-left.png';
import caret_right from 'assets/icons/sprites/icons/channels/caret-right.png';
import ChannelButton from 'entities/ChannelButton/ChannelButton';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useChannelsStore from 'shared/store/useChannelsStore';
import styles from './Navbar.module.scss';

interface NavbarProps {
   page: number | null;
   changePage: Dispatch<SetStateAction<number | null>>;
}

export default function Navbar({ changePage, page }: NavbarProps) {
   const location = useLocation();
   const { channels } = useChannelsStore();
   let pathname = location.pathname;
   const containerRef = useRef<HTMLDivElement | null>(null);

   const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
      if (containerRef.current) {
         containerRef.current.scrollLeft += e.deltaY;
      }
   };

   if (
      pathname === '/create-channel' ||
      pathname === '/channels' ||
      pathname === '/users' ||
      pathname === '/update-channel'
   ) {
      return null;
   }

   return (
      <>
         <div className={`${styles.pad}`}></div>
         <div
            className={styles.channels}
            onWheel={handleScroll}
         >
            <div className={styles.navBtns}>
               <img
                  src={caret_left}
                  alt=''
                  onClick={() => {
                     if(containerRef.current) {
                        containerRef.current.scrollLeft -= 66;
                     }
                  }}
               />
               <img
                  src={caret_right}
                  alt=''
                  onClick={() => {
                     if(containerRef.current) {
                        containerRef.current.scrollLeft += 66;
                     }
                  }}
               />
            </div>
            <div
               className={styles.channelsWrapper}
               ref={containerRef}
            >
               {channels &&
                  channels.map(channel => (
                     <ChannelButton
                        key={channel.channel_id}
                        onClick={(id) => {
                           changePage(id);
                        }}
                        name={channel.name}
                        icon={channel.icon_type}
                        id={Number(channel.channel_id)}
                           current={page === channel.channel_id}
                     />
                  ))}
            </div>
         </div>
      </>
   );
}
