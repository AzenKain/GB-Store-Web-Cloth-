"use client"
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useSession } from "next-auth/react";
import { addHeartApi, getCartDetailApi, getProductByIdApi, makeRequestApi, removeHeartApi, updateCartApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { ICartItem, CartType } from "@/types/cart";
import { AddDataCart, UpdateMethodCart, UpdateProductCart } from "../redux/features/cart/cart.redux";
import { ProductType } from "@/types/product";
import Image from "next/image";
import { UpdateCartDto } from "@/lib/dtos/cart";
import { toast } from "react-toastify";
import { UserType } from "@/types/user";
import { AddHeart, RemoveHeart } from "../redux/features/user/user.redux";


export default function Cart() {
    const { data: session, update } = useSession()
    const dataCart = useAppSelector((state) => state.CartRedux.value)
    const [dataItems, setDataItems] = useState<{ [productId: string]: ProductType }>({})
    const [shippingCost, setShippingCost] = useState<number>(25000)
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            // await update()
            let dataCart: CartType = await makeRequestApi(getCartDetailApi, null, session?.refresh_token, session?.access_token)
            if (dataCart == null) return;
            dispatch(AddDataCart(dataCart))
            let newDataItems: { [productId: string]: ProductType } = {};
            for (let i = 0; i < dataCart.items.length; i++) {
                let productId: string = dataCart.items[i].productId
                let tmpDataItem: ProductType = await getProductByIdApi(productId)
                newDataItems[productId] = tmpDataItem
            }
            setDataItems(newDataItems)
        }
        if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
        }
        dispatch()
    }, [dispatch, session])

    const handleShippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        switch (selectedOption) {
            case 'Standard shipping - 25.000đ':
                setShippingCost(25000);
                dispatch(UpdateMethodCart("STANDARD"))
                break;
            case 'Fast shipping - 50.000đ':
                setShippingCost(50000);
                dispatch(UpdateMethodCart("FAST"))
                break;
            default:
                break;
        }
    };

    const handleUpdateCart = async (product: ICartItem) => {
        if (session !== null) {
            let dto: UpdateCartDto = {
                productId: product.productId,
                quantity: product.quantity,
                color: product.color,
                size: product.size,
            }
            let dataReturn = await makeRequestApi(updateCartApi, dto, session?.refresh_token, session?.access_token)
            if (dataReturn !== null) {
                dispatch(UpdateProductCart(product))
                toast.success("Update cart successful!!")
            }
            else {
                toast.error("Update cart failed!!")
            }
            return;
        }
        dispatch(UpdateProductCart(product))
        toast.success("Update cart successful!!")
    }

    const handleUpdateHeart = async (productId: string, value: boolean) => {
        if (value) {
            if (session !== null) {
                let dataUser: UserType = await makeRequestApi(addHeartApi, productId, session?.refresh_token, session?.access_token)
                if (dataUser !== null) {
                    dispatch(AddHeart(productId))
                    return;
                }
                toast.error("Add heart failed!!")
                return;
            }
            dispatch(AddHeart(productId))
        }
        else {
            if (session !== null) {
                let dataUser: UserType = await makeRequestApi(removeHeartApi, productId, session?.refresh_token, session?.access_token)
                if (dataUser !== null) {
                    dispatch(RemoveHeart(productId))
                    return;
                }
                toast.error("Add heart failed!!")
                return;
            }
            dispatch(RemoveHeart(productId))
        }
    }

    const handleRedirect = (to: string) => {
        if (session == null) {
            toast.error("You must be logged in!")
            return;
        }
        router.push(to);
    }

    return (
        <div className="font-[sans-serif] container mx-auto mt-20">
            <div className="grid lg:grid-cols-3 gap-12 p-6 shadow-md my-10">
                <div className="lg:col-span-2 bg-white divide-y">

                    {dataCart?.items.map((product, index) => (
                        <div key={index} className="flex items-start max-sm:flex-col gap-8 py-6">
                            <div className="h-52 shrink-0">
                                <Image
                                    src={dataItems[product.productId]?.imgDisplay.find(img => img?.link?.includes(product.color.toLowerCase()))?.url ?? ""}
                                    width={100}
                                    height={100}
                                    alt={`${dataItems[product.productId]?.productName}`}
                                    className="w-full h-full object-contain rounded-md"
                                />
                            </div>
                            <div className="flex items-start gap-6 max-md:flex-col w-full">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#333] mb-6">
                                        {dataItems[product.productId]?.productName}
                                    </h3>
                                    <div>
                                        <h6 className="text-md text-gray-500">
                                            Size: <strong className="ml-2">{product.size}</strong>
                                        </h6>
                                        <h6 className="text-md text-gray-500 mt-2">
                                            Color: <strong className="ml-2">{product.color}</strong>
                                        </h6>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-6">
                                        <button
                                            onClick={() => handleUpdateCart({
                                                ...product,
                                                quantity: 0
                                            })}
                                            type="button"
                                            className="font-semibold text-gray-500 text-sm flex items-center gap-2 shrink-0"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 fill-current inline"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                    data-original="#000000"
                                                />
                                                <path
                                                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                            Remove
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await handleUpdateCart({
                                                    ...product,
                                                    quantity: 0
                                                })
                                                await handleUpdateHeart(product.productId, true)
                                            }}
                                            type="button"
                                            className="font-semibold text-gray-500 text-sm flex items-center gap-2 shrink-0"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18px"
                                                className="fill-current inline"
                                                viewBox="0 0 64 64"
                                            >
                                                <path
                                                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                            Move to wish list
                                        </button>
                                    </div>
                                </div>
                                <div className="md:ml-auto md:text-right">
                                    <div className="flex">
                                        <button
                                            onClick={() => handleUpdateCart({
                                                ...product,
                                                quantity: product.quantity - 1
                                            })}
                                            type="button"
                                            className="bg-transparent py-2 font-semibold text-[#333]"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-3 fill-current"
                                                viewBox="0 0 124 124"
                                            >
                                                <path
                                                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-transparent mx-4 px-4 py-2 font-semibold text-[#333] text-md border"
                                        >
                                            {product.quantity}
                                        </button>
                                        <button
                                            onClick={() => handleUpdateCart({
                                                ...product,
                                                quantity: product.quantity + 1
                                            })}
                                            type="button"
                                            className="bg-transparent py-2 font-semibold text-[#333]"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-3 fill-current"
                                                viewBox="0 0 42 42"
                                            >
                                                <path
                                                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-[#333]">
                                            <div className="text-gray-500 mr-2 font-medium line-through">
                                                {dataItems[product.productId]?.cost}đ
                                            </div>
                                        </h4>
                                        <h4 className="text-lg font-bold text-[#333] mt-2">{dataItems[product.productId]?.price}đ</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
                <div className="shadow-md p-6">
                    <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">
                        Order Summary
                    </h3>
                    <div className="mt-10">
                        <label className="text-xl font-extrabold text-[#333]">
                            Shipping
                        </label>
                        <select
                            onChange={handleShippingChange}
                            className="mt-6 block p-3 text-gray-600 w-full text-sm border rounded border-blue-600"
                        >
                            <option>Standard shipping - 25.000đ</option>
                            <option>Fast shipping - 50.000đ</option>
                        </select>
                    </div>
                    <div className="mt-10">
                        {/* <h3 className="text-xl font-extrabold text-[#333] mb-6">
                            Apply promo code
                        </h3>
                        <div className="flex border border-blue-600 overflow-hidden max-w-md rounded">
                            <input
                                type="email"
                                placeholder="Promo code"
                                className="w-full outline-none bg-white text-gray-600 text-md px-4 py-2.5"
                            />
                            <button
                                type="button"
                                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 text-md text-white"
                            >
                                Apply
                            </button>
                        </div> */}
                    </div>
                    <ul className="text-[#333] divide-y mt-6">
                        <li className="flex flex-wrap gap-4 text-md py-4">
                            Subtotal <span className="ml-auto font-bold">{dataCart?.totalPrice}đ</span>
                        </li>
                        <li className="flex flex-wrap gap-4 text-md py-4">
                            Shipping <span className="ml-auto font-bold">{shippingCost}đ</span>
                        </li>
                        <li className="flex flex-wrap gap-4 text-md py-4">
                            Tax <span className="ml-auto font-bold">10%</span>
                        </li>
                        <li className="flex flex-wrap gap-4 text-md py-4 font-bold">
                            Total <span className="ml-auto">{(dataCart?.totalPrice  * 1.1 + shippingCost).toFixed(3) }đ</span>
                        </li>
                    </ul>
                    <button
                        onClick={() => handleRedirect("/cart/checkout")}
                        type="button"
                        className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        Check out
                    </button>

                </div>
            </div>
        </div>
    )

} 