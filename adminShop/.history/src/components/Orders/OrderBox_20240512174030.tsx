'use client'
import { AddListOrder } from "@/app/redux/features/order/order.redux";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getTopProductApi, makeRequestApi } from "@/lib/api";
import { OrderType } from "@/types/order";
import { ProductType } from "@/types/product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const SalesBox = () => {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const listOrder = useAppSelector((state) => state.OrderRedux.value)
    const [dataHotSale, setDataHotSale] = useState<ProductType[]>([])


    useEffect(() => {
        const fetchData = async () => {
            try {
              const responseData: OrderType[] = await makeRequestApi(getAllOrderApi, null, session?.refresh_token, session?.access_token);
      
              dispatch(AddListOrder(responseData))
      
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
          }
      }, [])


    return (
       

            <div className="flex flex-col gap-10">
                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Top sales
                    </h4>
                </div>

                <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium">Product Name</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium">Category</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Price</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Cost</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Sold</p>
                    </div>
                </div>

                {dataHotSale.map((product, key) => (
                    <div
                        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={key}
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-12.5 w-15 rounded-md">
                                    <Image
                                        src={product?.imgDisplay[0]?.url}
                                        width={60}
                                        height={50}
                                        alt="Product"
                                    />
                                </div>
                                <p className="text-sm text-black dark:text-white">
                                    {product?.productName}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">
                                {product?.detail?.company}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">
                                ${product?.price}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">${product?.cost}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-meta-3">{product?.buyCount}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SalesBox;