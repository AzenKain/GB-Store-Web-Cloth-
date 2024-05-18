import { IDeliveryInfo, IPersonalInfo } from "@/types/order";

export type createOderDto = {
    userId?: string;

    deliveryInfo: IDeliveryInfo;

    personalDetails: IPersonalInfo;

    paymentMethods: string;

    deliveryType: string;

    note?: string;
}
