"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export const HeaderComponent = () => {
    const { data: session } = useSession()

    const router = useRouter()
    const handleRedirect = (to: string) => {
        router.push(to);
    }

    const handleSignOut = async () => {
        router.push('#')
        await signOut();
    }

    return (
        <div className="navbar fixed top-0 z-[99] bg-slate-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link
                                href={{
                                    pathname: '/search',
                                    query: { tags: 'women' },
                                }}>
                                WOMEN
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: '/search',
                                    query: { tags: 'women' },
                                }}>
                                WOMEN
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: '/search',
                                    query: { tags: 'women' },
                                }}>
                                WOMEN
                            </Link>
                        </li>
                        <li><Link href={"/search/men"}>MEN</Link></li>
                        <li><Link href={"/search/accessories"}>ACCESSORIES</Link></li>
                        <li><Link href={"/search/hot-sales"}>HOT SALES</Link></li>
                        <li><Link href={"/search/new-arrival"}>NEW ARRIVAL</Link></li>
                    </ul>
                </div>
                <Link href={"/"} className="btn btn-ghost text-xl">GLAMIFY</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li>
                            <Link
                                href={{
                                    pathname: '/search',
                                    query: { tags: 'women' },
                                }}>
                                WOMEN
                            </Link>
                        </li>
                    <li><Link href={"/search/men"}>MEN</Link></li>
                    <li><Link href={"/search/accessories"}>ACCESSORIES</Link></li>
                    <li><Link href={"/search/hot-sales"}>HOT SALE</Link></li>
                    <li><Link href={"/search/new-arrival"}>NEW ARRIVAL</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button onClick={() => handleRedirect("/search")} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button onClick={() => handleRedirect("/heart")} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button onClick={() => handleRedirect("/cart")} className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                {session == null ? (
                    <div className='flex items-center justify-center'>
                        <div className="border w-fit rounded-xl ml-1 shadow-sm">
                            <button onClick={() => handleRedirect("/login")} className="px-2 py-1 rounded-l-xl text-white m-0 bg-red-500 hover:bg-red-600 transition">Login</button>
                            <button onClick={() => handleRedirect("/signup")} className="px-2 py-1 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition">Register</button>
                        </div>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href={"/user/account"}>Profile</Link></li>
                            <li><Link href={"/user/order"}>Orders</Link></li>
                            <li><button onClick={async () => await handleSignOut()}>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}