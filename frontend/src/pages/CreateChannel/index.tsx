import ChannelData from 'features/ChannelData/ChannelData';
import styles from './CreateChannel.module.scss';
import CopyElement from 'features/CopyElement/CopyElement';
import PinButton from 'shared/ui/PinButton/PinButton';
import AdminNav from 'shared/ui/AdminNav/AdminNav';
import { useState } from 'react';
import useChannelsStore from 'shared/store/useChannelsStore';
import useTokenStore from 'shared/store/useTokenStore';
import useApi from 'shared/utils/ApiResponseHandler';
import { Channel } from 'shared/types';

export default function CreateChannel() {

   const [formData, setFormData] = useState({
      name: '',
      icon_type: 'string',
      channel_id: '',
      link: '',
      admin_id: '',
   });

   const {updateChannels} = useChannelsStore();
   const {getToken} = useTokenStore();
   let _accessToken = getToken();
   const api = useApi();

   const handleChange = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (value === '') {
         setFormData(prev => ({
           ...prev,
           [key]: '',
         }));
         return;
      }

      if((key === 'channel_id' || key === 'admin_id') && Number.isNaN(Number(value))) {
         return;
      }

      setFormData(prev => ({
         ...prev,
         [key]: key === 'channel_id' || key === 'admin_id' ? Number(value) : value
         }))
      };

   const createChannel = async() => {
      if(Object.values(formData).some(value => !value)) return;
      if(!_accessToken) return;
      const res = await api<Channel>({url: '/channel/', method: 'POST', data: formData});
      if(res) {
         updateChannels(res);
      }
   } 

   return (
      <>
         <div className={styles.CreateChannel}>
            <p className={styles.pageHeading}>Create a channel</p>
            <ChannelData name={formData.name} onNameChange={handleChange('name')}/>
            <PinButton/>
            <div className={styles.copy}>
               <CopyElement name='Channel Link' text='t.me/DnTyXst8UMASmJvt' value={formData.link} onValueChange={handleChange('link')}/>
               <CopyElement name='Channel ID' text='1001234567890' value={formData.channel_id} onValueChange={handleChange('channel_id')}/>
               <CopyElement name='Admin link' text='t.me/DnTyXst8UMASmJvt' value={formData.admin_id} onValueChange={handleChange('admin_id')}/>
            </div>
            <button className={styles.createBtn} onClick={createChannel}>Create</button>
         </div>
         <AdminNav/>
      </>
   );
}
