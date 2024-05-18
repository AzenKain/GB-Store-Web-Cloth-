
export type CartItemType = {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
}

export type CartType = {
    id?: string,

    userId?: string,

    items: CartItemType[];

    totalPrice: number,

    shippingAddress?: DeliveryInfoType;

    updateAt?: Date,

    createdAt?: Date
}