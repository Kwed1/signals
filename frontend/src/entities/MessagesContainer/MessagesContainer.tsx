import { useEffect, useRef, useState } from 'react';
import useTokenStore from 'shared/store/useTokenStore';
import { Message as IMessage} from 'shared/types';
import useApi from 'shared/utils/ApiResponseHandler';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './MessagesContainer.module.scss';
import Message from 'entities/Message/Message';
import { useLocation } from 'react-router-dom';

interface MessagesContainerProps {
   channel_id: number;
}

export default function MessagesContainer({
   channel_id,
}: MessagesContainerProps) {
   const [messages, setMessages] = useState<IMessage[]>([]);
   const [fetching, setFetching] = useState<boolean>(true);
   const [firstLoad, setFirstLoad] = useState<boolean>(true);
   const [stopLoad, setStopLoad] = useState<boolean>(false);
   const [page, setPage] = useState<number>(0);

   const { getToken } = useTokenStore();
   let _accessToken = getToken();
   const api = useApi();
   const location = useLocation();

   const fetchingRef = useRef<boolean>(fetching);
   const stopLoadRef = useRef<boolean>(stopLoad);

   useEffect(() => {
      fetchingRef.current = fetching;
   }, [fetching]);

   useEffect(() => {
      stopLoadRef.current = stopLoad;
   }, [stopLoad]);

   const scrollHandler = () => {
      if (fetchingRef.current || stopLoadRef.current) return;
      if (
         document.documentElement.scrollHeight -
            (document.documentElement.scrollTop + window.innerHeight) <
         100
      ) {
         setFetching(true)
      }
   };

   const fetchMessages = async () => {
      if(firstLoad) setFirstLoad(false);
      const res = await api<IMessage[]>({
         url: `/channel/${channel_id}/messages?limit=10&offset=${page}`,
         method: 'GET',
      });
      if(res && res.length < 10) setStopLoad(true);
      if(res) {
         setMessages(prev => [...prev, ...res]);
         setPage(prev => prev + 10);
      }
      setFetching(false);
   };

   useEffect(() => {
      document.addEventListener('scroll', scrollHandler);

      if (stopLoad) {
         return () => document.removeEventListener('scroll', scrollHandler);
      }

      return () => document.removeEventListener('scroll', scrollHandler);
   }, [stopLoad]);

   useEffect(() => {
      if(!_accessToken) return;
      if(stopLoadRef.current) return;
      if(fetchingRef.current) {
         fetchMessages();
      }
   }, [_accessToken, stopLoad, fetching])

   return (
      <div className={styles.container}>
         {messages && messages.map((message, index) => (
            <Message key={message.message_id} text={message.text} style={index % 2 === 0 ? 'left' : 'right'} specialStyle={location.pathname === '/update-channel' ? true : false}/>
         ))}
         {fetching && (
            <div className={styles.loader}>
               <CircularProgress />
            </div>
         )}
      </div>
   );
}
