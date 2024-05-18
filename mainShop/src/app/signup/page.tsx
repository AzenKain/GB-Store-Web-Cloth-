"use client"
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createOtpApi, signUpApi, verifyOtpApi } from "@/lib/api";
import { CreateOtpDto, SignUpDto, VerifyOtpDto } from "@/lib/dtos/auth";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

export default function SignUp(props: any) {
    const router = useRouter()
    const [isOtpModel, setIsOtpModel] = useState(false);
    const [emailUser, setEmailUser] = useState("");
    const [userName, setUserName] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [rePasswordUser, setRePasswordUser] = useState("");
    const [otpId, setOtpId] = useState("");

    const [otp, setOTP] = useState<string[]>(['', '', '', '', '', '']);
    const inputs = useRef<HTMLInputElement[]>([]);

    const handleChange = (index: number, value: string) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (value.length === 1 && index < otp.length - 1 && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }
        if (value.length === 0 && index > 0 && inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };

    const handleOtp = async () => {
        if (emailUser == "") {
            toast.error("You must enter your email!")
            return
        }
        if (passwordUser == "") {
            toast.error("You must enter your password!")
            return
        }
        if (rePasswordUser == "") {
            toast.error("You must enter your re-type password!")
            return
        }
        if (userName == "") {
            toast.error("You must enter your username!")
            return
        }
        if (passwordUser != rePasswordUser) {
            toast.error("Your password is not the same your re-type password!")
            return
        }
        let dto: CreateOtpDto = {
            email: emailUser,
            type: "SignUp",
        }
        const newOtp = await createOtpApi(dto);
        if (newOtp == null) return;
        handleShow();
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let tmpOtpId = otpId;
        if (otpId == "") {
            let dto: VerifyOtpDto = {
                email: emailUser,
                type: "SignUp",
                otpCode: otp.join("")
            }
            const newOtp = await verifyOtpApi(dto);
            if (newOtp === null) {
                toast.error("Check your Otp!")
                return
            };
            setOtpId(newOtp.otpId);
            tmpOtpId = newOtp.otpId;
        }


        let loginDto: SignUpDto = {
            email: emailUser,
            password: passwordUser,
            username: userName,
            otpId: tmpOtpId,
        }
        console.log(loginDto);

        const dataRe = await signUpApi(loginDto);
        if (dataRe == null) {
            toast.error("SignUp failed!")
            return
        }
        else {
            const res = await signIn("credentials", {
                email: emailUser, password: passwordUser, redirect: false,
            });

            if (!res?.error) {
                router.push(props.searchParams.callbackUrl ?? "http://localhost:3000");
                toast.success("SignUp successful!")
            }
            else {
                toast.error("SignUp failed!")
            }
        }

    }

    const handleReSend = async () => {
        let dto: CreateOtpDto = {
            email: emailUser,
            type: "SignUp",
        }
        const newOtp = await createOtpApi(dto);
        if (!newOtp) {
            toast.error("Create Otp failed!")
        }
        else {
            toast.success("Create Otp successful!")
        }
    }

    const handleShow = () => {
        const modal = document.getElementById('my_modal_view') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    }
    return (
        <div className="mt-10 bg-gray-100">
            <div className="min-h-screen  text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="text-center text-6xl">
                            {/* <img
                src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
                className="w-mx-auto"
              /> */}
                            GLAMIFY
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <div className="w-full flex-1 mt-1">
                                <div className="my-8 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Sign Up with E-mail
                                    </div>
                                </div>
                                <div className="mx-auto max-w-xs">
                                    <input
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Username"
                                    />
                                    <input
                                        value={emailUser}
                                        onChange={(e) => setEmailUser(e.target.value)}
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <input
                                        value={passwordUser}
                                        onChange={(e) => setPasswordUser(e.target.value)}
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <input
                                        value={rePasswordUser}
                                        onChange={(e) => setRePasswordUser(e.target.value)}
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Re-type Password"
                                    />
                                    <button onClick={async () => await handleOtp()} className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                        <span className="ml-">Sign Up</span>
                                    </button>
                                    <div className="text-center mt-4">
                                        <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                            href="#">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="text-center mt-2">
                                        <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                            href="/login">
                                            Already have an account? Login!
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full bg-green-100 text-center hidden lg:flex">
                        <div className="xl:m-16 w-full h full relative bg-contain bg-center bg-no-repeat">
                            <Image
                                layout="fill"
                                src="/image/young-friends-sitting-curb-city.svg"
                                alt="Studio Collection"
                                className="relative z-10 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>


            <dialog id="my_modal_view" data-theme="light" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>

                    <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50">
                        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                            <div className="mx-auto flex w-full flex-col space-y-16">
                                <div className="flex flex-col items-center justify-center text-center space-y-2">
                                    <div className="font-semibold text-3xl">
                                        <p>Email Verification</p>
                                    </div>
                                    <div className="flex flex-row text-sm font-medium text-gray-400">
                                        <p>We have sent a code to your email ba**@dipainhouse.com</p>
                                    </div>
                                </div>
                                <div>
                                    <form onSubmit={handleSignUp}>
                                        <div className="flex flex-col space-y-16">
                                            <div className="flex flex-row items-center justify-between mx-auto w-full gap-1">
                                                {otp.map((value, index) => (
                                                    <div key={index} className="w-16 h-16">
                                                        <input
                                                            ref={(el) => (inputs.current[index] = el as HTMLInputElement)}
                                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                            type="text"
                                                            pattern="[0-9]*"
                                                            inputMode="numeric"
                                                            maxLength={1}
                                                            value={value}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-col space-y-5">
                                                <div>
                                                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                        Verify Account
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-2 flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn&apos;t recieve code?</p>{" "}
                                        <button
                                            onClick={async () => await handleReSend()}
                                            className="flex flex-row items-center text-blue-600"
                                        >
                                            Resend
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </dialog>
        </div>
    );
}
