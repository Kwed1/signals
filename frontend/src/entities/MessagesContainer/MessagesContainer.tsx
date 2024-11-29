import CircularProgress from '@mui/material/CircularProgress';
import Message from 'entities/Message/Message';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
   import useTokenStore from 'shared/store/useTokenStore';
import { Direction, Message as IMessage } from 'shared/types';
import useApi from 'shared/utils/ApiResponseHandler';
import styles from './MessagesContainer.module.scss';

interface MessagesContainerProps {
   channel_id: number | null;
   search?: string;
   messages: IMessage[];
   setMessages: Dispatch<SetStateAction<IMessage[]>>;
   direction?: Direction;
   allMessagesMode?: boolean;
}

export default function MessagesContainer({
   channel_id,
   search,
   messages,
   setMessages,
   direction,
   allMessagesMode = false
}: MessagesContainerProps) {
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

   useEffect(() => {
      setMessages([]);
      setFetching(true);
      setFirstLoad(true);
      setStopLoad(false);
      setPage(0);
   }, [channel_id, direction])

   useEffect(() => {
      console.log('Channel ID changed:', channel_id);
   }, [channel_id]);

   const findedMessages = useMemo(() => {
      if (search) {
         return messages.filter(message =>
            message.text.toLowerCase().includes(search.toLowerCase()),
         );
      } else {
         return [];
      }
   }, [messages, search]);

   const scrollHandler = () => {
      if (fetchingRef.current || stopLoadRef.current) return;
      if (
         document.documentElement.scrollHeight -
            (document.documentElement.scrollTop + window.innerHeight) <
         100
      ) {
         setFetching(true);
      }
   };

   const fetchMessages = async () => {
      if (firstLoad) setFirstLoad(false);

      const baseUrl = `/channel/${channel_id}/messages?limit=10&offset=${page}`;
      const url = allMessagesMode ? baseUrl : `${baseUrl}&direction=${direction}`;

      const res = await api<IMessage[]>({
         url: url,
         method: 'GET',
      });

      if (res && res.length < 10) setStopLoad(true);
      if (res) {
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
      if (!_accessToken) return;
      if (channel_id === null) return;
      if (stopLoadRef.current) return;
      if (fetchingRef.current) {
         fetchMessages();
      }
   }, [_accessToken, stopLoad, fetching, channel_id]);

   if (channel_id === null) {
      return <p className={styles.selectChannel}>Please select a channel</p>;
   }

   return (
      <div className={styles.container}>
         {(search ? findedMessages : messages).map((message, index) => (
            <Message
               key={message.message_id}
               text={message.text}
               style={index % 2 === 0 ? 'left' : 'right'}
               specialStyle={location.pathname === '/update-channel'}
               canPin={allMessagesMode}
               id={message.message_id}
            />
         ))}
         {fetching && (
            <div className={styles.loader}>
               <CircularProgress />
            </div>
         )}
         {!search && messages.length === 0 && (
            <p className={styles.no_message}>No messages yet</p>
         )}
         {search && findedMessages.length === 0 && (
            <p className={styles.no_message}>No messages found</p>
         )}
      </div>
   );
}
