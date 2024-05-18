"use client";
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { resetFilter, updateFilter } from '../redux/features/search/search.redux';
import { AddFilterProduct, AddListProduct, FindByName } from '../redux/features/product/product.redux';
import { addHeartApi, getAllProductApi, makeRequestApi, removeHeartApi } from '@/lib/api';
import { ProductType } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import { FilterSection } from '@/types/filter';
import { AddHeart, RemoveHeart, UpdateUser } from '../redux/features/user/user.redux';
import { UserType } from '@/types/user';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const sortOptions = [
    { name: 'Most Popular',  current: true },
    { name: 'Best Rating',  current: false },
    { name: 'Newest',  current: false },
    { name: 'Price: Low to High',  current: false },
    { name: 'Price: High to Low',  current: false },
]

const banner = {
    'men': 'http://localhost:3434/media/file/man.jpg',
    'women': 'http://localhost:3434/media/file/women.jpg',
    'Accessories': 'http://localhost:3434/media/file/phu-kien.jpg',
    'hot-sales': 'http://localhost:3434/media/file/best-sellers.jpg',
    'new-arrival': 'http://localhost:3434/media/file/new-arrivals.jpg'
}


// const subCategories = [
//     { name: 'Men', href: '/search/men' },
//     { name: 'Women', href: '/search/women' },
//     { name: 'Accessories', href: '/search/accessories' },
//     { name: 'Hot Sales', href: '/search/hot-sales' },
//     { name: 'New arrival', href: '/search/new-arrival' },
// ]

function classNames(...classes: any[]): string {
    return classes.filter(Boolean).join(' ')
}


export default function Search() {
    const { data: session } = useSession()
    const filters = useAppSelector((state) => state.SearchRedux.value)
    const dispatch = useAppDispatch()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const products = useAppSelector((state) => state.ProductRedux.value);
    const user = useAppSelector((state) => state.UserRedux.value);
    const [bannerDisplay, setBannerDisplay] = useState<string | null>(null)
    const [search, setSearch] = useState<string>("")
    const [sort, setSearch] = useState<string>("")
    

    const searchParams = useSearchParams()


    useEffect(() => {

        dispatch(resetFilter());
        let isSet = false;
        let newFilter: FilterSection[] = filters.map(filter => ({
            ...filter,
            options: filter.options.map(option => ({ ...option, checked: false })) 
        }));
        for (let i = 0; i < filters.length; i++) {
            let listValue = searchParams.getAll(filters[i].id)
            for (let j = 0; j < listValue.length; j++) {
                dispatch(updateFilter({ id: filters[i].id, value: listValue[j], checked: true }))
                let tmpIndex = newFilter[i].options.findIndex(option => option.value === listValue[j]);
                
                if (tmpIndex == -1) continue;
                newFilter[i].options[tmpIndex].checked = true;
            }
            if (listValue.length > 0) {
                setBannerDisplay(banner[listValue[0].toLowerCase()])
                isSet = true;
            }
        }
        const fetchData = async () => {
            const responseData: ProductType[] = await getAllProductApi();
            dispatch(AddListProduct(responseData));
            dispatch(
                AddFilterProduct(newFilter)
            )
        };
        fetchData();
        if (isSet == false) {
            setBannerDisplay(null)
        }

    }, [dispatch, searchParams])

    useEffect(() => {
        dispatch(
            AddFilterProduct(filters)
        )
        if (search == "") return;
        dispatch(FindByName(search))
    }, [filters, search, dispatch])

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
        <div className="bg-white">
            <div>
                {bannerDisplay !== null && (
                    <div>
                        <Image 
                            src={bannerDisplay} 
                            width={1920}
                            height={450}
                            alt='banner'
                            className='w-screen mt-12'
                        />
                    </div>
                )}
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            {/* {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a href={category.href} className="block px-2 py-3">
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))} */}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            checked={option.checked}
                                                                            onChange={() => {
                                                                                dispatch(
                                                                                    updateFilter({ id: section.id, value: option.value, checked: !option.checked }),

                                                                                )
                                                                            }}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-rows-2 sm:grid-rows-1 grid-flow-col justify-between border-b border-gray-200 pb-6 pt-24 gap-2">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Searching</h1>
                        <label className="input input-bordered self-center flex items-center gap-2">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="grow" placeholder="Search" />
                            <div className=''>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </div>
                        </label>
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {/* {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href}>{category.name}</a>
                                        </li>
                                    ))} */}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    checked={option.checked}
                                                                    onChange={() => {
                                                                        dispatch(
                                                                            updateFilter({ id: section.id, value: option.value, checked: !option.checked }),
                                                                        )
                                                                    }}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}

                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
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
                    </section>
                </main>
            </div>
        </div>
    )
}
