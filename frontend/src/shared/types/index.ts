export interface Channel {
    name: string;
    icon_type: string;
    channel_id: number;
    link: string;
    admin_id: number;
}

export interface User {
    username: string;
    telegram_id: number;
    subscription: null | boolean;
    end_at: string;
}