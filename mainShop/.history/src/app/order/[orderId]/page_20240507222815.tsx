"use client";
import { UpdateProductCart } from "@/app/redux/features/cart/cart.redux";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Backend_URL } from "@/lib/Constants";
import { addHeartApi, getProductByIdApi, makeRequestApi, removeHeartApi, updateCartApi } from "@/lib/api";
import { IImage, ProductType } from "@/types/product";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { UpdateCartDto } from "@/lib/dtos/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserType } from "@/types/user";
import { AddHeart, RemoveHeart } from "@/app/redux/features/user/user.redux";


export default function Product({ params }: { params: { productId: string } }) {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const [productData, setProductData] = useState<ProductType | null>(null)
    const router = useRouter()
    const user = useAppSelector((state) => state.UserRedux.value);
    useEffect(() => {
        const fetchData = async () => {
            const data: ProductType = await getProductByIdApi(params.productId)
            console.log(data)
            setProductData(data)
        }
        fetchData();
    }, [])

    if (productData == null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="w-48 loading loading-spinner text-primary"></span>
            </div>
        )
    }

    return (
        <div className="font-[sans-serif] mt-20 mx-10">

        </div>
    );
}
