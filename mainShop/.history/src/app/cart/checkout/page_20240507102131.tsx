export default function Cart() {
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
                                        type="text"
                                        placeholder="First name"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
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
                                        type="text"
                                        placeholder="District"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <input
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
                                        type="radio"
                                        className="w-5 h-5 cursor-pointer"
                                        id="VNPAY"
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
                                        type="radio"
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
                                        type="text"
                                        placeholder="Address"
                                        className="px-4 py-3.5 w-full bg-white text-[#333] col-span-2 text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-4 mt-12">
                        <button
                            type="button"
                            className="px-6 py-3.5 text-sm bg-transparent border-2 text-[#333] rounded-md hover:bg-gray-100"
                        >
                            Pay later
                        </button>
                        <button
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