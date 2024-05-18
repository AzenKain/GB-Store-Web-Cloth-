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


            {orderData.values.map =}
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                            <p className="font-semibold text-base leading-7 text-black">
                                Order Id:{" "}
                                <span className="text-indigo-600 font-medium">#10234987</span>
                            </p>
                            <p className="font-semibold text-base leading-7 text-black mt-4">
                                Order Payment :{" "}
                                <span className="text-gray-400 font-medium">
                                    {" "}
                                    18th march 2021
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">
                        <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                            <div className="img-box max-lg:w-full">
                                <img
                                    src="https://pagedone.io/asset/uploads/1701167607.png"
                                    alt="Premium Watch image"
                                    className="aspect-square w-full lg:max-w-[140px]"
                                />
                            </div>
                            <div className="flex flex-row items-center w-full ">
                                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                    <div className="flex items-center">
                                        <div className="">
                                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                                Premium Quality Dust Watch
                                            </h2>
                                            <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                                By: Dust Studios
                                            </p>
                                            <div className="flex items-center ">
                                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                    Size: <span className="text-gray-500">100 ml</span>
                                                </p>
                                                <p className="font-medium text-base leading-7 text-black ">
                                                    Qty: <span className="text-gray-500">2</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm leading-7 text-black">
                                                    price
                                                </p>
                                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                                    $100
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm leading-7 text-black">
                                                    Status
                                                </p>
                                                <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                                    Ready for Delivery
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                    Expected Delivery Time
                                                </p>
                                                <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                    23rd March 2021
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                            <div className="img-box max-lg:w-full">
                                <img
                                    src="https://pagedone.io/asset/uploads/1701167621.png"
                                    alt="Diamond Watch image"
                                    className="aspect-square w-full lg:max-w-[140px]"
                                />
                            </div>
                            <div className="flex flex-row items-center w-full ">
                                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                    <div className="flex items-center">
                                        <div className="">
                                            <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                                                Diamond Platinum Watch
                                            </h2>
                                            <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                                Diamond Dials
                                            </p>
                                            <div className="flex items-center  ">
                                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                    Size: <span className="text-gray-500">Regular</span>
                                                </p>
                                                <p className="font-medium text-base leading-7 text-black ">
                                                    Qty: <span className="text-gray-500">1</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm leading-7 text-black">
                                                    price
                                                </p>
                                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                                    $100
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm leading-7 text-black">
                                                    Status
                                                </p>
                                                <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                                                    Dispatched
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                    Expected Delivery Time
                                                </p>
                                                <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                    23rd March 2021
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                            <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                                <svg
                                    className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={22}
                                    height={22}
                                    viewBox="0 0 22 22"
                                    fill="none"
                                >
                                    <path
                                        d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                                        stroke=""
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                Cancel Order
                            </button>
                            <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                                Paid using Credit Card{" "}
                                <span className="text-gray-500">ending with 8822</span>
                            </p>
                        </div>
                        <p className="font-semibold text-lg text-black py-6">
                            Total Price: <span className="text-indigo-600"> $200.00</span>
                        </p>
                    </div>
                </div>
            </div>



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
