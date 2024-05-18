"use client"
import { UpdateUser } from "@/app/redux/features/user/user.redux";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { createOrderApi, getUserDetailApi, makeRequestApi } from "@/lib/api";
import { UserType } from "@/types/user";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { OrderType } from "@/types/order";
import { createOderDto } from "@/lib/dtos/order";
import { AddDataCart } from "@/app/redux/features/cart/cart.redux";
export default function Cart() {
    const router = useRouter()
    const { data: session, update } = useSession()
    const userDetail = useAppSelector((state) => state.UserRedux.value)
    const dataCart = useAppSelector((state) => state.CartRedux.method)
    const dispatch = useAppDispatch()
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [payment, setPayment] = useState<string>("VNPAY");

    useEffect(() => {
        const fetchData = async () => {
            let dataUser: UserType = await makeRequestApi(getUserDetailApi, null, session?.refresh_token, session?.access_token)
            dispatch(UpdateUser(dataUser));
            setFirstName(dataUser.firstName ? dataUser.firstName : "")
            setLastName(dataUser.lastName ? dataUser.lastName : "")
            setAddress(dataUser.address ? dataUser.address : "")
            setPhoneNumber(dataUser.phoneNumber ? dataUser.phoneNumber : "")
        }
        if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
        }
        if (session == null) {
            router.back();
        }
    }, [session])

    const handleCreateOrder = async () => {
        if (session == null) {
            toast.error("You must be logged in!")
            return;
        }
        if (!userDetail.email) {
            toast.error("You must enter your email!")
            return;
        }
        if (phoneNumber == "") {
            toast.error("You must enter your phone number!")
            return;
        }
        if (address == "") {
            toast.error("You must enter your address!")
            return;
        }
        if (lastName == "") {
            toast.error("You must enter your last name!")
            return;
        }
        let dto: createOderDto = {
            deliveryInfo : {
                city: city,
                district: district,
                address: address
            },
            personalDetails: {
                email: userDetail.email,
                lastName: lastName,
                firstName: firstName,
                phoneNumber: phoneNumber
            },
            paymentMethods: payment,
            deliveryType: dataCart
        }
        let dataReturn = await makeRequestApi(createOrderApi, dto, session?.refresh_token, session?.access_token)
        if (!dataReturn) {
            toast.error("Create your order failed!")
            return;
        }
        dispatch(AddDataCart({
            items: [],
            totalPrice: 0,
        }))
        toast.success("Create your order successful!")
        if (payment == "")
        router.push(`/order/${dataReturn.id}`)
    }

    return (
        <div className="font-[sans-serif] bg-white p-4 container mx-auto mt-20">
            <div className="max-w-4xl mx-auto p-6 shadow-md my-10">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">
                        Checkout
                    </h2>
                </div>
                <div className="mt-12">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-[#333]">01</h3>
                            <h3 className="text-xl font-bold text-[#333]">Personal Details</h3>
                        </div>
                        <div className="md:col-span-2">
                            <form>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <input
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        type="text"
                                        placeholder="First name"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        type="text"
                                        placeholder="Last name"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        disabled
                                        value={userDetail.email}
                                        type="email"
                                        placeholder="Email address"
                                        className="input input-bordered px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        type="number"
                                        placeholder="Phone number"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div>
                            <h3 className="text-xl font-bold text-[#333]">02</h3>
                            <h3 className="text-xl font-bold text-[#333]">Shopping Address</h3>
                        </div>
                        <div className="md:col-span-2">
                            <form>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <input
                                        value={district}
                                        onChange={e => setDistrict(e.target.value)}
                                        type="text"
                                        placeholder="District"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        type="text"
                                        placeholder="City"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        type="text"
                                        placeholder="Address"
                                        className="px-4 py-3.5 w-full bg-white text-[#333] col-span-2 text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div>
                            <h3 className="text-xl font-bold text-[#333]">03</h3>
                            <h3 className="text-xl font-bold text-[#333]">Payment method</h3>
                        </div>
                        <div className="md:col-span-2">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="flex items-center">
                                    <input
                                        onChange={e => setPayment(e.target.value)}
                                        type="radio"
                                        checked={payment == "VNPAY"}
                                        className="w-5 h-5 cursor-pointer"
                                        id="VNPAY"
                                        value="VNPAY"
                                        defaultChecked={true}
                                    />
                                    <label
                                        htmlFor="VNPAY"
                                        className="ml-4 flex gap-2 cursor-pointer"
                                    >
                                        <img
                                            src={"../image/icon/VNPAY.png"}
                                            className="w-20"
                                            alt="VNPAY"
                                        />
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={e => setPayment(e.target.value)}
                                        type="radio"
                                        value="COD"
                                        checked={payment == "COD"}
                                        className="w-5 h-5 cursor-pointer"
                                        id="COD"
                                    />
                                    <label
                                        htmlFor="COD"
                                        className="ml-4 flex gap-2 cursor-pointer"
                                    >
                                        <img
                                            src={"../image/icon/SHIP_COD.png"}
                                            className="w-16"
                                            alt="COD"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div>
                            <h3 className="text-xl font-bold text-[#333]">04</h3>
                            <h3 className="text-xl font-bold text-[#333]">Note</h3>
                        </div>
                        <div className="md:col-span-2">
                            <form>
                                <div className="">
                                    <input
                                        value={note}
                                        onChange={e => setNote(e.target.value)}
                                        type="text"
                                        placeholder="Notes"
                                        className="px-4 py-3.5 w-full bg-white text-[#333] col-span-2 text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-4 mt-12">
                        <button
                            onClick={() => router.back()}
                            type="button"
                            className="px-6 py-3.5 text-sm bg-transparent border-2 text-[#333] rounded-md hover:bg-gray-100"
                        >
                            Pay later
                        </button>
                        <button
                            onClick={async () => await handleCreateOrder()}
                            type="button"
                            className="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Pay now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

} 