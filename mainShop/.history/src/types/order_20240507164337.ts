import { ICartItem } from "./cart";

interface IDeliveryInfo {
    city: string;
    district: string;
    address: string;
  }
  
  interface IPersonalInfo {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }
  
  interface IIsPay {
    isPaid: boolean;
    updateAt: Date;
    createdAt: Date;
  }
  
  interface IOrder  {
    id: string;
    userId: string;
    isDisplay: boolean;
    totalAmount: number;
    status: string;
    listProducts: ICartItem[];
    notes: string;
    deliveryInfo: IDeliveryInfo;
    personalDetails: IPersonalInfo;
    paymentMethods: string;
    isPay:IIsPay;
    updateAt: Date;
    createdAt: Date;
  }