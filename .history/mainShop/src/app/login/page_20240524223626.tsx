"use client"
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

export default function Login(props: any) {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    if (email == "") {
      toast.error("You must enter your email!")
      return
    }
    if (password == "") {
      toast.error("You must enter your password!")
      return
    }
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });

    if (!res?.error) {
      router.push(props.searchParams.callbackUrl ?? "/");
      return;
    }
    toast.error("Email or password incorrect!")
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
                    Sign In with E-mail
                  </div>
                </div>
                <div className="mx-auto max-w-xs">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                  />
                  <button onClick={async () => await onSubmit()} className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy={7} r={4} />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-">Sign In</span>
                  </button>
                  <div className="text-center mt-4">
                    <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="#">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center mt-2">
                    <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="/signup">
                      Don&apos;t have an account yet?  Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-green-100 text-center hidden lg:flex">
            <div className="xl:m-16 w-full h full relative bg-contain bg-center bg-no-repeat">
              {/* <img
                src="https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
              /> */}
              <Image
                layout="fill"
                src="/image/image-collection.svg"
                alt="Studio Collection"
                className="relative z-10 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
