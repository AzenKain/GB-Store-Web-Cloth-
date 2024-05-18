import { MessagesType } from "./product";

export type RoomchatType = {
    id?: string;
    isDisplay?: boolean;
    isBlock?: boolean;
    memberRoomchat?: string[];
    messages?: MessagesType[];
    updateAt?: Date;
    createdAt?: Date;

}
