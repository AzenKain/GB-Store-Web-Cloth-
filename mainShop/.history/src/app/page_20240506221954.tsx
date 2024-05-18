import { addHeartApi, getTopProductApi, makeRequestApi, removeHeartApi } from "@/lib/api";
import { UserType } from "@/types/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddHeart, RemoveHeart } from "./redux/features/user/user.redux";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { ProductType } from "@/types/product";

export default function Home() {
  const { data: session, update } = useSession()
  const [dataHotSale, setDataHotSale] = useState<ProductType[]>([])
  const [dataNewArrival, setDataNewArrival] = useState<ProductType[]>([])
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.UserRedux.value);
  const products = [
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const responseData1: ProductType[] = await getTopProductApi("hot-sales", 6)
      setDataHotSale(responseData1);
      const responseData2: ProductType[] = await getTopProductApi("new-arrival", 6)
      setDataNewArrival(responseData2)
  fetchData();
  }, [])

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

  return (
    <main>
      <div className="relative h-[580px] my-6">
        <Image src="/image/young-friends-sitting-curb-city.svg" alt="Studio Collection" layout="fill" objectFit="cover" />
        <div className="absolute inset-x-0 bottom-10 text-center text-white pb-12">
          <div className="text-2xl text-white font-light">
            <span>SPRING SUMMER</span>
          </div>
          <div className="text-4xl text-white ">
            <span>TELL ME MORE</span>
          </div>
          <div className="mt-4">
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['men'] },
              }}
              className="btn mr-2 bg-white text-black hover:bg-gray-200 hover:text-black text-base"
            >
              SHOP MEN
            </Link>
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['women'] },
              }}
              className="btn bg-white text-black hover:bg-gray-200 hover:text-black text-base"
            >
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </div>

      <div className="p-5 rounded mt-3 text-center my-2">
        <h3 className="bestseller text-3xl font-[350] mb-2">BEST SELLER</h3>
        <Link href={{
          pathname: '/search',
          query: { tags: ['hot-sales'] },
        }} className="btn btn-outli">VIEW ALL</Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-10">
      {dataHotSale.map((product, index) => (
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

      <div className="relative h-[580px] my-6">
        <Image src="/image/image-collection.svg" alt="Studio Collection" layout="fill" objectFit="cover" />
        <div className="absolute inset-x-0 bottom-10 text-center text-white pb-12">
          <div className="text-2xl font-light">
            <span>NEW IN</span>
          </div>
          <div className="text-4xl">
            <span>STUDIO COLLECTION</span>
          </div>
          <div className="mt-4">
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['new-arrival'] },
              }}
              className="btn bg-white text-black hover:bg-gray-200 hover:text-black text-base">SHOP NOW</Link>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-10">
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
    </main>
  );
}
