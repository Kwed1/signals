import ChannelCard from 'entities/ChannelCard/ChannelCard';
import Search from 'entities/Search/Search';
import ChoiceModal from 'features/ChoiceModal/ChoiceModal';
import DeleteModal from 'features/DeleteModal/DeleteModal';
import { useEffect } from 'react';
import useChannelsStore from 'shared/store/useChannelsStore';
import useModalsStore from 'shared/store/useModalsStore';
import { Channel } from 'shared/types';
import PageHeading from 'shared/ui/PageHeading/PageHeading';
import useApi from 'shared/utils/ApiResponseHandler';
import styles from './ChannelsList.module.scss';

export default function ChannelsList() {
   const { choiceModalOpen, deleteModalOpen } = useModalsStore();
   const { channels, setChannels } = useChannelsStore();
   const api = useApi();

   const getChannelsFromApi = async () => {
      const res = await api<Channel[]>({
         url: '/channel/',
         method: 'GET',
      });
      if (res) {
         setChannels(res);
      }
   };

   useEffect(() => {
      getChannelsFromApi();
   }, []);

   return (
      <>
         <div className={styles.ChannelsList}>
            <PageHeading text='Channels' />
            <Search />
            <div className={styles.list}>
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
               <ChannelCard />
            </div>
         </div>
         {choiceModalOpen && <ChoiceModal />}
         {deleteModalOpen && <DeleteModal />}
      </>
   );
}
