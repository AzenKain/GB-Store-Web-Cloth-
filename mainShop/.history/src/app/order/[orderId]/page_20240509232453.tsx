"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { OrderType } from "@/types/order";
import { cancelOrderApi, createVnpayApi, getOrderByIdApi, getProductByIdApi, makeRequestApi } from "@/lib/api";
import { ProductType } from "@/types/product";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Order({ params }: { params: { orderId: string } }) {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const [orderData, setOrderData] = useState<OrderType | null>(null)
    const router = useRouter()
    const [dataItems, setDataItems] = useState<{ [productId: string]: ProductType }>({})

    useEffect(() => {
        const fetchData = async () => {
            let dataOrder: OrderType = await makeRequestApi(getOrderByIdApi, params.orderId, session?.refresh_token, session?.access_token)
            if (dataOrder == null) return;
            setOrderData(dataOrder)
            let newDataItems: { [productId: string]: ProductType } = {};
            for (let i = 0; i < dataOrder.listProducts.length; i++) {
                let productId: string = dataOrder.listProducts[i].productId
                let tmpDataItem: ProductType = await getProductByIdApi(productId)
                newDataItems[productId] = tmpDataItem
            }
            setDataItems(newDataItems)
        }
        if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
        }
    }, [session])

    if (orderData == null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="w-48 loading loading-spinner text-primary"></span>
            </div>
        )
    }

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

    const handleCancel = async () => {
        if (session == null) return;
        let dataReturn = await makeRequestApi(cancelOrderApi, orderData.id, session?.refresh_token, session?.access_token)
        if (!dataReturn) {
            toast.error("Cancel your order failed!")
            return;
        }
        if (!dataReturn.isRequest) {
            toast.error("Cancel your order failed!")
            return;
        }
        let dataOrder: OrderType = await makeRequestApi(getOrderByIdApi, params.orderId, session?.refresh_token, session?.access_token)
        if (dataOrder == null) return;
        setOrderData(dataOrder)
        return;
    }

    return (
        <div className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                    Payment Successful
                </h2>
                <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
                    you can
                    check our order summary frm below</p>
                <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                            <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="text-indigo-600 font-medium">{orderData.id}</span></p>
                            <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium">{new Date(orderData?.createdAt ?? "").toUTCString()}</span></p>
                        </div>
                        {orderData.isPay?.isPaid == false && orderData.status !== "Cancelled" && orderData.paymentMethods == "VNPAY" && (
                            <div
                                onClick={async () => await handlePaynow()}
                                className="cursor-pointer text-center text-3xl font-bold border-4 bg-green-300 px-4 py-2 rounded-full"
                            >
                                Pay Now
                            </div>
                        )}

                        <div className="text-center text-3xl font-bold border-4 bg-gray-300 px-4 py-2 rounded-full">
                            {orderData.isPay?.isPaid ? "Paid" : "UnPaid"}

                        </div>
                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">
                        {orderData?.listProducts.map((product, index) => (
                            <div key={index} className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                                <div className="img-box max-lg:w-full">
                                    <Image
                                        src={dataItems[product.productId]?.imgDisplay.find(img => img?.link?.includes(product.color.toLowerCase()))?.url ?? ""}
                                        width={100}
                                        height={100}
                                        alt={`${dataItems[product.productId]?.productName}`}
                                        className="aspect-square w-full lg:max-w-[140px]"
                                    />
                                </div>
                                <div className="flex flex-row items-center w-full ">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                        <div className="flex items-center">
                                            <div>
                                                <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                                    {dataItems[product.productId]?.productName}
                                                </h2>
                                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                                    By: {dataItems[product.productId]?.detail?.company}</p>
                                                <div className="flex items-center ">
                                                    <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                        Size:
                                                        <span className="text-gray-500">
                                                            {product.size}
                                                        </span>
                                                    </p>
                                                    <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                        Color:
                                                        <span className="text-gray-500">
                                                            {product.color}
                                                        </span>
                                                    </p>
                                                    <p className="font-medium text-base leading-7 text-black ">
                                                        Qty:
                                                        <span className="text-gray-500">
                                                            {product.quantity}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-5">
                                            <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                <div className="flex gap-3 lg:block">
                                                    <p className="font-medium text-sm leading-7 text-black">Price</p>
                                                    <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">{product.price}đ</p>
                                                </div>
                                            </div>
                                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                <div className="flex gap-3 lg:block">
                                                    <p className="font-medium text-sm leading-7 text-black">
                                                        Status
                                                    </p>
                                                    <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-indigo-50 text-emerald-600">
                                                        {orderData.status}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                <div className="flex gap-3 lg:block">
                                                    <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                        Expected Delivery Time</p>
                                                    <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                        {new Date(new Date(orderData?.createdAt ?? "").setDate(new Date(orderData?.createdAt ?? "").getDate() + 7)).toDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                            {orderData?.status == "Processing" && orderData?.isPay?.isPaid == false && (
                                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                                    <svg className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                        <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="true" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                    Cancel Order
                                </button>
                            )}

                            <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Payment method: <span className="text-gray-500">{orderData.paymentMethods}</span></p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold text-lg text-black py-6">Shipping: <span className="text-indigo-600">
                                {orderData.deliveryType == "STANDARD" ? 25000 : orderData.deliveryType == "FAST" && 50000}đ
                            </span></p>
                            <p className="font-semibold text-lg text-black py-6">Total Price:
                                <span className="text-indigo-600">
                                    {orderData.totalAmount && (orderData.totalAmount * 1.1 + (orderData.deliveryType == "STANDARD" ? 25000 : orderData.deliveryType == "FAST" ? 50000 : 0)).toFixed(3)}đ
                                    <span className="text-base text-red-500">
                                        {" (+10% tax)"}
                                    </span>
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="text-2xl text-red-500">
                        Do you want cancel this order?
                    </div>
                    <div>
                        
                    </div>
                    <button className="btn btn-success w-16 text-lg">Yes</button>
                    <button className="btn btn-error w-16 text-lg">No</button>
                </div>
            </dialog>
        </div>
    );
}
