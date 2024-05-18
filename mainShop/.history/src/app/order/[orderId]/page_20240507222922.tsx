"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function Order({ params }: { params: { orderId: string } }) {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const [orderData, setOrderData] = useState<ProductType | null>(null)
    const router = useRouter()
    const user = useAppSelector((state) => state.UserRedux.value);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data: ProductType = await getProductByIdApi(params.productId)
    //     }
    //     fetchData();
    // }, [])

    if (orderData == null) {
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
