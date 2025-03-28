import React, { useEffect, useState } from "react";
import "./Shop.css";
import Category from "../Category/Category";
import ProductCard from "../ProductCard";
import BrandCategory from "../BrandCategory/BrandCategory";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../services/axios";

function Shop() {
    const { category } = useParams("category");
    const { brand } = useParams("brand");
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [brandItem, setBrandItem] = useState([]);

    useEffect(() => {
        const fetchProduct = () => {
            if (!!category) {
                setBrandItem([]);
                axios
                    .get(
                        !!brand
                            ? `/products/shop/${category}/${brand}`
                            : `/products/shop/${category}`
                    )
                    .then((resp) => {
                        setProduct(resp.data.data.product);
                        setBrandItem(resp.data.data.brand);
                    })
                    .catch((err) => {
                        setProduct([]);
                        console.log(err.response.data);
                    });
            } else {
                navigate("/");
            }
        };

        fetchProduct();
    }, [category, brand]);

    return (
        <div className="shop__container lg:flex justify-between">
            <div className="flex flex-col gap-3 w-full lg:w-1/5">
                <Category style={{ width: "100%", height: "500px" }} />
                {brandItem.length > 0 && (
                    <BrandCategory
                        style={{ width: "100%", height: "auto" }}
                        data={brandItem}
                    />
                )}
            </div>
            <div className="shop__content">
                {product.length > 0 ? (
                    <div className="flex flex-wrap">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
                            {product.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ProductCard data={item} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full text-xl">
                        No Product
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;
