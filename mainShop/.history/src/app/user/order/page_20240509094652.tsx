"use client"
import { AddListOrder } from "@/app/redux/features/order/order.redux";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getOrderUserApi, getProductByIdApi, makeRequestApi } from "@/lib/api";
import { OrderType } from "@/types/order";
import { ProductType } from "@/types/product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function User() {
    const router = useRouter()
    const { data: session, update } = useSession()
    const userDetail = useAppSelector((state) => state.UserRedux.value)
    const orderData =  useAppSelector((state) => state.OrderRedux.value)
    const [dataItems, setDataItems] = useState<{ [productId: string]: ProductType }>({})
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        const fetchData = async () => {
            let dataOrder: OrderType[] = await makeRequestApi(getOrderUserApi, null, session?.refresh_token, session?.access_token)
            if (!dataOrder) return;
            dispatch(AddListOrder(dataOrder))
            let newDataItems: { [productId: string]: ProductType } = {};
            for (let i = 0; i < dataOrder.length; i++) {
                for (let j = 0; j < dataOrder[i].listProducts.length; j++) {
                    let productId: string = dataOrder[i].listProducts[j].productId
                    if (newDataItems[productId]) continue;
                    let tmpDataItem: ProductType = await getProductByIdApi(productId)
                    newDataItems[productId] = tmpDataItem
                }
            }
            setDataItems(newDataItems)
        }
        if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
        }
    }, [session])
    const handlePaynow = async () => {
        if (session == null) return;
        let dataReturn2 = await makeRequestApi(createVnpayApi, orderData.id, session?.refresh_token, session?.access_token)
        if (!dataReturn2) {
            toast.error("Create your Vnpay bill failed!")
            return;
        }
        router.push(`${dataReturn2.url}`)
        return;
    }

    return (
        <div className="py-24 relative">
            <div role="tablist" className="tabs tabs-bordered">
                <a role="tab" className="tab">All singles</a>
                <a role="tab" className="tab tab-active">Processing</a>
                <a role="tab" className="tab">In transit</a>
                <a role="tab" className="tab">Delivered</a>
                <a role="tab" className="tab">Cancelled</a>
            </div>
            <label className="my-4 input input-bordered flex items-center w-full max-w-[26rem] sm:max-w-[36rem] lg:max-w-[77rem] mx-auto">
                <input type="text" className="grow" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>


            {orderData?.map((order, index) => (

            )}
            


            <div className="mx-auto my-4 w-full max-w-[10rem] sm:max-w-[9rem] lg:max-w-[5rem] ">
                <div className="join">
                    <button className="join-item btn">«</button>
                    <button className="join-item btn">Page 22</button>
                    <button className="join-item btn">»</button>
                </div>
            </div>
        </div>
    );
}
