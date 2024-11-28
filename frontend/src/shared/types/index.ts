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

export interface Message {
   message_id: number;
   channel_id: number;
   text: string;
   attachments: Attachment[];
}

export interface Attachment {
   attachment_type: string;
   attachment_id: string;
}

export enum Direction {
   LONG = 'LONG',
   SHORT = 'SHORT',
}
