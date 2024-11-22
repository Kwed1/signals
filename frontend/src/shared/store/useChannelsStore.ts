import { Channel } from 'shared/types';
import {create} from 'zustand';

interface ChannelsStore {
    channels: Channel[];
    setChannels: (value: Channel[]) => void;
}

const useChannelsStore = create<ChannelsStore>((set) => ({
    channels: [],
    setChannels: (value) => set({channels: value})
}))

export default useChannelsStore;