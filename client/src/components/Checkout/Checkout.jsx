import React from "react";
import { IoClose, IoRemove, IoAdd } from "react-icons/io5";

function CartPage() {
    const state = 1;

    return (
        <>
            <div className="flex items-center justify-center">
                <div
                    className={`${
                        state >= 1 ? "bg-gray-400 text-white" : "bg-gray-100"
                    } rounded-[300px] py-1 w-[100px] text-center`}
                >
                    Cart
                </div>
                <div
                    className={`${
                        state >= 2 ? "bg-gray-400" : "bg-gray-100"
                    } w-[30px] h-[4px]`}
                ></div>
                <div
                    className={`${
                        state >= 2 ? "bg-gray-400 text-white" : "bg-gray-100"
                    } rounded-[300px] py-1 w-[100px] text-center`}
                >
                    Checkout
                </div>
                <div
                    className={`${
                        state >= 3 ? "bg-gray-400" : "bg-gray-100"
                    } w-[30px] h-[4px]`}
                ></div>
                <div
                    className={`${
                        state >= 3 ? "bg-gray-400 text-white" : "bg-gray-100"
                    } rounded-[300px] py-1 w-[100px] text-center`}
                >
                    Payment
                </div>
                <div
                    className={`${
                        state >= 4 ? "bg-gray-400" : "bg-gray-100"
                    } w-[30px] h-[4px]`}
                ></div>
                <div
                    className={`${
                        state >= 4 ? "bg-gray-400 text-white" : "bg-gray-100"
                    } rounded-[300px] py-1 w-[100px] text-center`}
                >
                    Review
                </div>
            </div>
            <div className="w-full px-5 mx-auto mt-8 md:w-[85%]">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="col-span-2">
                        <a
                            href="#"
                            className="block bg-white border border-gray-200 rounded-lg shadow mb-5 duration-200 hover:bg-gray-100"
                        >
                            <div className="flex">
                                <img
                                    src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
                                    alt=""
                                    className="max-h-[100px] md:max-h-[160px]"
                                />
                                <div className="mt-3 w-full">
                                    <div className="flex items-center justify-between">
                                        <h5 className="mb-2 text-sm md:text-xl font-bold tracking-tight text-gray-900">
                                            Silver High Neck Sweater
                                        </h5>
                                        <IoClose className="mr-3 text-2xl rounded-lg duration-200 hover:bg-[#BCBCBC]" />
                                    </div>
                                    <div className="flex flex-col h-3/5 w-full justify-between">
                                        <p className="font-normal text-xs md:text-base text-gray-700 dark:text-gray-400">
                                            US$210.00 x 1 US$210.00
                                        </p>
                                        <div className="flex items-center justify-end mr-4">
                                            <button className="border-2 border-gray-400 p-2 rounded-lg duration-200 font-bold hover:bg-gray-400 hover:text-white">
                                                <IoRemove className="text-lg" />
                                            </button>
                                            <p className="mx-3">1</p>
                                            <button className="border-2 border-gray-400 p-2 rounded-lg duration-200 font-bold hover:bg-gray-400 hover:text-white">
                                                <IoAdd className="text-lg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;
