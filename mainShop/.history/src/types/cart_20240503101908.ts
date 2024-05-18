import { DeliveryInfoType } from "./user";

export type CartItemType = {
    productId: string;
    quantity: number;
    size: 
}

export type CartType = {
    id?: string,

    userId: string,

    items: CartItemType[];

    totalPrice: number,

    shippingAddress?: DeliveryInfoType;

    updateAt: Date,

    createdAt: Date
}