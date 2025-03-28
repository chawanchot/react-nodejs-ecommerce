import React from "react";
import Menu from "./Menu";
import ProductCard from "../ProductCard";
import useWishlist from "../../hooks/useWishlist";

function Wishlist() {
    const { wishlistItem } = useWishlist();

    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row w-full gap-3">
                <div>
                    <Menu page="wishlist" />
                </div>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg text-center leading-6 text-gray-900 font-bold">
                            Wishlist
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5">
                            {wishlistItem.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ProductCard
                                            data={item}
                                            fav={wishlistItem}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
