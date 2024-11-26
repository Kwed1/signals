export interface Channel {
    name: string;
    icon_type: string;
    channel_id: string | number;
    link: string;
    admin_id: string | number;
}

export interface User {
    username: string;
    telegram_id: number;
    subscription: null | boolean;
    end_at: string;
}