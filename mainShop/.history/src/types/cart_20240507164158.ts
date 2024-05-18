
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



    updateAt?: Date,

    createdAt?: Date
}