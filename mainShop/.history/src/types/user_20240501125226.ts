import { CartType } from "./cart";

export type DeliveryInfoType = {
    name: string;
    phoneNumber: string;
    address: string;
}

export type UserType = {
    id?: string;

    isDisplay?: boolean;

    username?: string;

    firstName?: string;

    lastName?: string;

    email?: string;

    phoneNumber?: string;

    imgDisplay?: string;

    birthday?: Date; 

    address?: string;

    gender?: string;

    role?: string;

    memberExp?: number;

    memberLevel?: string;

    cartId?: string;

    roomId?: string;

    updateAt?: Date;

    createdAt?: Date;
}