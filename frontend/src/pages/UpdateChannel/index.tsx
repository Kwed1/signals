import ChannelData from 'features/ChannelData/ChannelData';
import CopyElement from 'features/CopyElement/CopyElement';
import PinModal from 'features/PinModal/PinModal';
import { useEffect, useState } from 'react';
import useChannelsStore from 'shared/store/useChannelsStore';
import useModalsStore from 'shared/store/useModalsStore';
import useTokenStore from 'shared/store/useTokenStore';
import { Channel } from 'shared/types';
import AdminNav from 'shared/ui/AdminNav/AdminNav';
import useApi from 'shared/utils/ApiResponseHandler';
import styles from './UpdateChannel.module.scss'
import { useNavigate } from 'react-router-dom';

export default function UpdateChannel() {
   const { pinModalOpen, setPinModalOpen } = useModalsStore();
   const {
      editing,
      selectedChannel,
      updateChannelById,
      setEditing,
   } = useChannelsStore();
   const navigate = useNavigate();

   const [formData, setFormData] = useState<Channel>({
      name: '',
      icon_type: 'home',
      channel_id: '',
      link: '',
      admin_id: '',
   });

   useEffect(() => {
      if (editing && selectedChannel !== null) {
         setFormData({
            name: selectedChannel.name,
            icon_type: selectedChannel.icon_type,
            channel_id: selectedChannel.channel_id,
            link: selectedChannel.link,
            admin_id: selectedChannel.admin_id,
         });
      }
   }, [editing, selectedChannel]);

   const { getToken } = useTokenStore();
   let _accessToken = getToken();
   const api = useApi();

   const handleChange =
      (key: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const { value } = e.target;

         if (value === '') {
            setFormData(prev => ({
               ...prev,
               [key]: '',
            }));
            return;
         }

         if (
            (key === 'channel_id' || key === 'admin_id') &&
            Number.isNaN(Number(value))
         ) {
            return;
         }

         setFormData(prev => ({
            ...prev,
            [key]:
               key === 'channel_id' || key === 'admin_id'
                  ? Number(value)
                  : value,
         }));
      };

   const createChannel = async () => {
      if (Object.values(formData).some(value => !value)) return;
      if (!_accessToken) return;
      const res = await api<Channel>({
         url: `/channel/${selectedChannel?.channel_id}`,
         method: 'PUT',
         data: formData,
      });
      if (res && editing && selectedChannel) {
         updateChannelById(Number(selectedChannel.channel_id), res);
         setEditing(false);
         setFormData({
            name: '',
            admin_id: '',
            channel_id: '',
            icon_type: 'home',
            link: ''
         })
         navigate('/channels')
      }
   };

   return (
      <>
         <div className={styles.CreateChannel}>
            <p className={styles.pageHeading}>Update channel</p>
            <ChannelData
               name={formData.name}
               onNameChange={handleChange('name')}
            />
            <button
               className={styles.pinBtn}
               onClick={() => setPinModalOpen(true)}
            >
               Pin this post
            </button>
            <div className={styles.copy}>
               <CopyElement
                  name='Channel Link'
                  text='t.me/DnTyXst8UMASmJvt'
                  value={formData.link}
                  onValueChange={handleChange('link')}
               />
               <CopyElement
                  name='Channel ID'
                  text='1001234567890'
                  value={formData.channel_id}
                  onValueChange={handleChange('channel_id')}
               />
               <CopyElement
                  name='Admin link'
                  text='t.me/DnTyXst8UMASmJvt'
                  value={formData.admin_id}
                  onValueChange={handleChange('admin_id')}
               />
            </div>
            <button
               className={styles.createBtn}
               onClick={createChannel}
            >
               Update
            </button>
         </div>
         <AdminNav />
         {pinModalOpen && <PinModal />}
      </>
   );
}
