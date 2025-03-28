import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Product.css";
import axios from "../../services/axios";
import OutsideClickHandler from "react-outside-click-handler";
import useCart from "../../hooks/useCart";

function Product() {
    const { id } = useParams("id");
    const [productData, setProductData] = useState([]);
    const [productColor, setProductColor] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [productQuantity, setProductQuantity] = useState([]);
    const [productAvailable, setProductAvailable] = useState();
    const [sizeSelect, setSizeSelect] = useState(false);
    const { setCartCount } = useCart();

    const [size, setSize] = useState("---");
    const [color, setColor] = useState("")
    const [quantity, setQuantity] = useState(0);

    const handleColor = (e, item) => {
        setColor(item);
        const colorEl = document.getElementsByClassName("color__button");
        for (let i = 0; i < colorEl.length; i++) {
            colorEl[i].classList.remove("active");
        }
        e.target.classList.add("active");
    };

    const handleQuantity = (state) => {
        if (state === "plus" && quantity < productAvailable) {
            setQuantity(quantity + 1);
        };
        if (state === "minus" && quantity > 0) {
            setQuantity(quantity - 1);
        };
    };

    // CHECK CHOOSE PRODUCT OPTIONS FOR CHANGE NUMBER OF PRODUCT 
    const handleQuantityState = (state) => {
        if (productColor.length === 0 && size !== "---") {  // PRODUCT NOT HAVE COLOR CHOOSE ONLY SIZE
            handleQuantity(state);
        } else if (productSize.length === 0 && color) {  // PRODUCT NOT HAVE SIZE CHOOSE ONLY COLOR
            handleQuantity(state);
        } else if (productSize.length === 0 && productColor.length === 0) {  // PRODUCT NOT HAVE SIZE AND COLOR
            handleQuantity(state);
        } else {
            if (color && size !== "---") {  // CHOOSE COLOR AND SIZE 
                handleQuantity(state);
            };
        };
    };

    useEffect(() => {
        const fetchProduct = () => {
            axios
                .get("/product/" + id)
                .then((resp) => {
                    setProductData(resp?.data?.data);
                    setProductQuantity(resp?.data?.quantity);

                    // SUM ALL QUANTITY
                    const allQuantity = resp?.data?.quantity.reduce((sum, { quantity }) => {
                        return sum + quantity
                    }, 0);
                    setProductAvailable(parseInt(allQuantity));

                    // DELETE DUMPLICATE COLOR
                    if (resp?.data?.quantity[0]?.color !== null) {
                        const colors = resp?.data?.quantity.map(item => item?.color);
                        const uniqueColor = resp?.data?.quantity
                            .filter(({ color }, index) => !colors.includes(color, index + 1))
                            .map(item => item?.color);
                        setProductColor(uniqueColor);
                    };

                    // DELETE DUMPLICATE SIZE
                    if (resp?.data?.quantity[0]?.size !== null) {
                        const sizes = resp?.data?.quantity.map(item => item?.size);
                        const uniqueSize = resp?.data?.quantity
                            .filter(({ size }, index) => !sizes.includes(size, index + 1))
                            .map(item => item?.size);

                        setProductSize(uniqueSize);
                    };
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchProduct();
    }, [id]);

    // FIND PRODUCT AVAILABLE
    useEffect(() => {
        // CHOOSE COLOR AND SIZE
        if (color && size !== "---") {
            const quantity = productQuantity
                .filter(item => item?.color === color && item?.size === size)
                .map(({ quantity }) => quantity);
            setProductAvailable(quantity[0] ? quantity[0] : 0);
            // CHOOSE ONLY SIZE
        } else if (!color && size !== "---") {
            const quantity = productQuantity
                .filter(item => item?.size === size)
                .reduce((sum, { quantity }) => sum + quantity, 0);
            setProductAvailable(quantity);
            // CHOOSE ONLY COLOR
        } else if (color) {
            const quantity = productQuantity
                .filter(item => item?.color === color)
                .reduce((sum, { quantity }) => sum + quantity, 0);
            setProductAvailable(quantity);
        }

        setQuantity(0);

    }, [color, size])

    function setCart() {
        let cartItem = JSON.parse(localStorage.getItem("cart"));

        let quantityId;
        let indexInCart;

        if (color && size !== "---") {
            quantityId = productQuantity.filter(item => item.size === size && item.color === color)[0].id;
        } else if (!color && size !== "---") {
            quantityId = productQuantity.filter(item => item.size === size)[0].id;
        } else if (color) {
            quantityId = productQuantity.filter(item => item.color === color)[0].id;
        } else {
            quantityId = productQuantity[0].id
        }

        if (cartItem) { // CHECK PRODUCT ALREADY IN LOCAL STORAGE
            if (size !== "---" || color) {
                indexInCart = cartItem.findIndex(el => el.itemId === productData[0].id && el.quantityId === quantityId); // FIND INDEX WITH SIZE AND PRODUCT
            } else {
                indexInCart = cartItem.findIndex(el => el.itemId === productData[0].id); // FIND INDEX WITH PRODUCT
            }
            
            if (indexInCart.toString() !== "-1") {
                cartItem.splice(indexInCart, 1); // REMOVE IF ALREADY IN CART
            }

            cartItem.push({
                itemId: productData[0].id,
                quantityId: quantityId,
                quantity: quantity
            });
            localStorage.setItem("cart", JSON.stringify(cartItem));
        } else {
            localStorage.setItem("cart", JSON.stringify(
                [
                    {
                        itemId: productData[0].id,
                        quantityId: quantityId,
                        quantity: quantity
                    }
                ]
            ));
        }

        setCartCount(JSON.parse(localStorage.getItem("cart")).length);
    }

    return (
        <div className="w-full">
            {productData.map((item, index) => {
                return (
                    <div className="container mx-auto" key={index}>
                        {/* Breadcrumb Section */}
                        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mb-8">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/"
                                        className="inline-flex items-center text-sm font-medium text-gray-700"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-4 h-4 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            aria-hidden="true"
                                            className="w-6 h-6 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <Link
                                            to={`/shop/${item.category.toLowerCase()}`}
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {item.category}
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            aria-hidden="true"
                                            className="w-6 h-6 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <Link
                                            to={`/shop/${item.category.toLowerCase()}/${item.brand.toLowerCase()}`}
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {item.brand}
                                        </Link>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className="w-full flex flex-col lg:flex-row justify-between">
                            {/* Image Product */}
                            <div className="w-full mr-20">
                                <div className="w-full border flex justify-center items-center overflow-hidden relative mb-3">
                                    <img src={item.img} alt={item.name} className="h-full object-contain" />
                                </div>
                            </div>
                            {/* Product Detail */}
                            <div className="shrink grow px-5">
                                <div className="w-full">
                                    <small className="uppercase mb-2">
                                        {item.category}
                                    </small>
                                    <p className="text-xl font-bold">
                                        {item.name}
                                    </p>
                                    <div className="flex items-center mb-4">
                                        {item.discount_percent !== 0 && (
                                            <span className="line-through text-gray-500 mt-2 mr-2">
                                                ฿ {item.price.toLocaleString()}
                                            </span>
                                        )}
                                        <span className="text-base font-bold text-blue-600">
                                            ฿{" "}
                                            {item.discount_percent !== 0
                                                ? (item.price -
                                                    item.price *
                                                    (item.discount_percent /
                                                        100)).toLocaleString()
                                                : item.price.toLocaleString()}
                                        </span>
                                    </div>
                                    {/* Description */}
                                    <p className="leading-6 opacity-75 text-base mb-8">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Sequi vero eveniet
                                        obcaecati excepturi eum? Sunt accusamus
                                        provident deleniti, consectetur vero
                                        nihil mollitia quod fugit accusantium
                                        autem eius quos repellat perspiciatis?
                                    </p>
                                    <div className="mb-3">
                                        <p>Available : {productAvailable}</p>
                                    </div>
                                    {productColor.length > 0 &&
                                        <div className="colors mb-6">
                                            <span className="opacity-75 font-bold text-base">
                                                COLOR
                                            </span>
                                            {/* Color Select */}
                                            <div className="flex gap-3 items-center mt-2">
                                                {productColor.map((item, index) => {
                                                    return (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            className={`color__button rounded-full ${item}`}
                                                            onClick={(e) => handleColor(e, item)}
                                                        ></button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    }
                                    {productSize.length > 0 &&
                                        <OutsideClickHandler display="contents" onOutsideClick={() => setSizeSelect(false)}>
                                            <div className="size mb-6 w-28">
                                                <label
                                                    id="listbox-label"
                                                    className="opacity-75 font-bold text-base"
                                                >
                                                    SIZE
                                                </label>
                                                {/* Size Dropdown */}
                                                <div className="relative mt-1">
                                                    <button
                                                        type="button"
                                                        className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm sm:text-sm"
                                                        aria-haspopup="listbox"
                                                        aria-expanded="true"
                                                        aria-labelledby="listbox-label"
                                                        onClick={() =>
                                                            setSizeSelect(!sizeSelect)
                                                        }
                                                    >
                                                        <span className="flex items-center">
                                                            <span className="block truncate uppercase">
                                                                {size}
                                                            </span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <svg
                                                                className="h-5 w-5 text-gray-400"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    {sizeSelect && (
                                                        <ul
                                                            className="absolute z-10 mt-1 max-h-56 w-28 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                            tabIndex="-1"
                                                            role="listbox"
                                                            aria-labelledby="listbox-label"
                                                            aria-activedescendant="listbox-option-3"
                                                        >
                                                            {productSize.map((item, index) => {
                                                                return (
                                                                    <li
                                                                        key={index}
                                                                        className="size__list"
                                                                        role="option"
                                                                        aria-selected="false"
                                                                        onClick={() => {
                                                                            setSize(item);
                                                                            setSizeSelect(
                                                                                !sizeSelect
                                                                            );
                                                                        }}
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <span className="font-normal ml-3 block truncate uppercase">
                                                                                {item}
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </OutsideClickHandler>
                                    }
                                    <div className="h-12 w-full flex items-center gap-3 mb-3">
                                        <div className="w-24 flex items-center border px-4 h-full">
                                            <div className="flex justify-between items-center w-full">
                                                <button
                                                    type="button"
                                                    className="text-base"
                                                    onClick={() => handleQuantityState("minus")}
                                                >-</button>
                                                <span className="text-base">{quantity}</span>
                                                <button
                                                    type="button"
                                                    className="text-base"
                                                    onClick={() => handleQuantityState("plus")}
                                                >+</button>
                                            </div>
                                        </div>
                                        <div className="w-20 h-full flex items-center justify-center">
                                            <button type="button" className="text-base">
                                                <span>
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                                                            stroke="#D5D5D5"
                                                            strokeWidth="2"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="square"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="grow shrink h-full">
                                            <button
                                                type="button"
                                                disabled={productAvailable === 0 || quantity === 0}
                                                className="h-full bg-black text-white font-bold w-36 rounded-lg disabled:bg-gray-400"
                                                onClick={() => setCart()}
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Product;
