import { ICartItem } from "./cart";

export type IDeliveryInfo = {
    city: string;
    district: string;
    address: string;
}

export type IPersonalInfo = {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export type IIsPay = {
    isPaid: boolean;
    bank: string;
    trac
    updateAt: Date;
    createdAt: Date;
}

export type OrderType = {
    id?: string;
    userId: string;
    isDisplay?: boolean;
    totalAmount?: number;
    status?: string;
    listProducts: ICartItem[];
    notes: string;
    deliveryType: string;
    deliveryInfo: IDeliveryInfo;
    personalDetails: IPersonalInfo;
    paymentMethods: string;
    isPay?: IIsPay;
    updateAt?: Date;
    createdAt?: Date;
}