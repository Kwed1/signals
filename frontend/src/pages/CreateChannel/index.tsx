import ChannelData from 'features/ChannelData/ChannelData';
import CopyElement from 'features/CopyElement/CopyElement';
import { useEffect, useState } from 'react';
import useChannelsStore from 'shared/store/useChannelsStore';
import useTokenStore from 'shared/store/useTokenStore';
import { Channel } from 'shared/types';
import AdminNav from 'shared/ui/AdminNav/AdminNav';
import useApi from 'shared/utils/ApiResponseHandler';
import styles from './CreateChannel.module.scss';
import { useNavigate } from 'react-router-dom';
import useModalsStore from 'shared/store/useModalsStore';
import IconSelect from 'features/IconSelect/IconSelect';

export default function CreateChannel() {
   const {
      updateChannels,
   } = useChannelsStore();
   const navigate = useNavigate();
   const {iconModalOpen} = useModalsStore();

   const [formData, setFormData] = useState<Channel>({
      name: '',
      icon_type: '',
      channel_id: '',
      link: '',
      admin_id: '',
   });

   const { getToken } = useTokenStore();
   let _accessToken = getToken();
   const api = useApi();

   const handleChange =
      (key: keyof typeof formData) =>
      (value: React.ChangeEvent<HTMLInputElement> | string) => {
         const finalValue = typeof value === 'string' ? value : value.target.value;

         if (finalValue === '') {
            setFormData(prev => ({
               ...prev,
               [key]: '',
            }));
            return;
         }

         if (
            (key === 'channel_id' || key === 'admin_id') &&
            Number.isNaN(Number(finalValue))
         ) {
            return;
         }

         setFormData(prev => ({
            ...prev,
            [key]:
               key === 'channel_id' || key === 'admin_id'
                  ? Number(finalValue)
                  : finalValue,
         }));
      };

   const createChannel = async () => {
      if (Object.values(formData).some(value => !value)) return;
      if (!_accessToken) return;
      const res = await api<Channel>({
         url: '/channel/',
         method: 'POST',
         data: formData,
      });
      if (res) {
         updateChannels(res);
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
            <p className={styles.pageHeading}>Create a channel</p>
            <ChannelData
               icon={formData.icon_type}
               name={formData.name}
               onNameChange={handleChange('name')}
            />
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
               Create
            </button>
         </div>
         <AdminNav />
         {iconModalOpen && <IconSelect onIconChange={handleChange('icon_type')}/>}
      </>
   );
}
