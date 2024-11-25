import { Channel } from 'shared/types';
import {create} from 'zustand';

interface ChannelsStore {
    channels: Channel[];
    selectedChannel: Channel | null,
    setSelected: (value: Channel | null) => void;
    setChannels: (value: Channel[]) => void;
    deleteChannel: (value: number) => void;
}

const useChannelsStore = create<ChannelsStore>((set,get) => ({
    channels: [],
    selectedChannel: null,
    setSelected: (value) => set({selectedChannel: value}),
    setChannels: (value) => set({channels: value}),
    deleteChannel: (value) => {
        const currentChannels = get().channels;
        if(currentChannels) {
            set({channels: currentChannels.filter(channel => channel.channel_id !== value)})
        }
    }
}))

export default useChannelsStore;