import { Channel } from 'shared/types';
import {create} from 'zustand';

interface ChannelsStore {
    channels: Channel[];
    selectedChannel: Channel | null,
    editing: boolean;
    selectedIcon: string | null;
    setSelectedIcon: (value: string | null) => void;
    setEditing: (value: boolean) => void;
    setSelected: (value: Channel | null) => void;
    setChannels: (value: Channel[]) => void;
    updateChannels: (value: Channel) => void;
    deleteChannel: (value: number) => void;
    updateChannelById: (id: number, newData: Partial<Channel>) => void;
}

const useChannelsStore = create<ChannelsStore>((set,get) => ({
    channels: [],
    selectedChannel: null,
    editing: false,
    selectedIcon: null,
    setSelectedIcon: value => set({selectedIcon: value}),
    setEditing: (value) => set({editing: value}),
    setSelected: (value) => set({selectedChannel: value}),
    setChannels: (value) => set({channels: value}),
    updateChannels: (value) => {
        const currentChannels = get().channels;
        set({channels: [...currentChannels, value]})
    },
    deleteChannel: (value) => {
        const currentChannels = get().channels;
        if(currentChannels) {
            set({channels: currentChannels.filter(channel => channel.channel_id !== value)})
        }
    },
    updateChannelById: (id: number, newData: Partial<Channel>) => {
        const currentChannels = get().channels;
        const updatedChannels = currentChannels.map((channel) =>
          channel.channel_id === id ? { ...channel, ...newData } : channel
        );
        set({ channels: updatedChannels });
    }
}))

export default useChannelsStore;