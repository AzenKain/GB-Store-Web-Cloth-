
export type ICartItem = {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
}

export type CartType = {
    id?: string,

    userId?: string,

    items: ICartItem[];

    totalPrice: number,

    updateAt?: Date,

    createdAt?: Date
}