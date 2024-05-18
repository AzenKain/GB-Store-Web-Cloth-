import { useSession } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { ProductType } from "@/types/product"
import { useEffect, useState } from "react"
import { UserType } from "@/types/user"
import { AddHeart, AddHeart, RemoveHeart, UpdateUser } from "../redux/features/user/user.redux"
import { getProductByIdApi, getUserDetailApi, makeRequestApi, removeHeartApi } from "@/lib/api"
import { toast } from "react-toastify"

export default function Heart() {
    const { data: session, update } = useSession()
    const [dataItems, setDataItems] = useState<{ [productId: string]: ProductType }>({})
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.UserRedux.value);

    useEffect(() => {
        const fetchData = async () => {
            let dataUser: UserType = await makeRequestApi(getUserDetailApi, null, session?.refresh_token, session?.access_token)
            dispatch(UpdateUser(dataUser))
            let newDataItems: { [productId: string]: ProductType } = {};
            for (let i = 0; i < dataUser.heart.length; i++) {
                let productId: string = dataUser.heart[i]
                let tmpDataItem: ProductType = await getProductByIdApi(productId)
                newDataItems[productId] = tmpDataItem
            }
            setDataItems(newDataItems)
        }
        if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
        }
    }, [dispatch, session])

    const handleUpdateHeart = async (productId: string, value: boolean)  => {
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

    return (
        <div className="font-[sans-serif] mx-auto mt-20">
            <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
                    Product you like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {products.map((product, index) => (
                        <div key={product.id} className="bg-white rounded-2xl p-6 hover:-translate-y-2 transition-all relative">
                            <button
                                onClick={async () => await handleUpdateHeart(product?.id ?? "", !user.heart.includes(product?.id ?? ""))}
                                className="bg-gray-100 w-10 h-10  hover:w-12 hover:h-12 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 z-10"
                            >
                                {user.heart.includes(product?.id ?? "") ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                )}
                            </button>
                            <div className="w-11/12 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                                <Image
                                    src={product.imgDisplay[0].url}
                                    alt={product.productName}
                                    className="h-full w-full object-contain"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div>
                                <Link href={`/product/${product.id}`} className="text-lg font-bold text-gray-800">
                                    {product.productName}
                                </Link>
                                <p className="text-gray-500 text-sm mt-2">
                                    {product.detail?.company}
                                </p>
                                <h4 className="text-lg text-gray-700 font-bold mt-4">{product.price}đ</h4>
                            </div>
                            <div className="flex mt-[5px] flex-row justify-center gap-1 justify-self-center">
                                {product.color.map((value: string, index) => (
                                    <div
                                        key={index}
                                        className="border-[3px] border-indigo-500/75  w-[30px] h-[30px]"
                                        style={{ backgroundColor: value }}
                                    />
                                ))}

                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
} 