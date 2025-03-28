import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import ProductCard from "../ProductCard";
import axios from "../../services/axios";
import useWishlist from "../../hooks/useWishlist";

function AllProduct() {
    const [newProduct, setNewProduct] = useState([]);
    const { wishlistItem } = useWishlist();

    useEffect(() => {
        axios
            .get("/products/new")
            .then((resp) => {
                setNewProduct(resp.data.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);

    return (
        <section className="daily__container">
            <h3 className="font-bold text-2xl text-center">
                <span>
                    <i className="fa-solid fa-shop text-yellow-400"></i>
                </span>{" "}
                All Product
            </h3>
            <div className="flex flex-wrap mt-5">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
                    {newProduct.map((item, index) => {
                        return (
                            <div key={index}>
                                <ProductCard data={item} fav={wishlistItem} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default AllProduct;
