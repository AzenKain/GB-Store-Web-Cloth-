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
            setMainDisplay(data?.imgDisplay[0])
        }
        fetchData();
    }, [])

    const [mainDisplay, setMainDisplay] = useState<IImage>()
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantityProduct, setQuantityProduct] = useState(1)

    const handleSelection = (value: string) => {
        let indexHref = productData?.imgDisplay.findIndex(item => item.link?.includes(value))
        if (indexHref === -1 || indexHref == undefined) return;
        setMainDisplay(productData?.imgDisplay[indexHref])
    }

    const handleAddToCart = async () => {
        if (productData?.id == undefined) return false;
        if (selectedColor == "") {
            toast.error("You still haven't chosen the color yet!!")
            return false;
        };
        if (selectedSize == "") {
            toast.error("You still haven't chosen the size yet!!")
            return false;
        };

        if (session !== null) {
            let dto: UpdateCartDto = {
                productId: productData?.id,
                quantity: quantityProduct,
                color: selectedColor,
                size: selectedSize,
            }
            let dataReturn = await makeRequestApi(updateCartApi, dto, session?.refresh_token, session?.access_token)
            if (dataReturn !== null) {
                dispatch(UpdateProductCart(
                    {
                        productId: productData?.id,
                        quantity: quantityProduct,
                        color: selectedColor,
                        size: selectedSize,
                        price: productData.price
                    }))
                toast.success("Update cart successful!!")
                return true;
            }
            else {
                toast.error("Update cart failed!!")
            }
            return false;
        }

        dispatch(UpdateProductCart(
            {
                productId: productData?.id,
                quantity: quantityProduct,
                color: selectedColor,
                size: selectedSize,
                price: productData.price
            }))
        toast.success("Update cart successful!!")
        return true;
    }

    const handleByNow = async () => {
        let event = await handleAddToCart();
        if (event) router.push("/cart")
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
