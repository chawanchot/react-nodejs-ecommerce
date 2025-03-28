import React from "react";
import "./Cart.css";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import axios from "../../services/axios";

function Cart({ handleCartMenu }) {
    const { cartItem, setCartItem, setCartCount } = useCart();
    let sumPrice = cartItem.reduce((sum, item) => {
        if (item.discount_percent !== 0) {
            return (
                sum + (item.price - item.price * (item.discount_percent / 100))
            );
        } else {
            return sum + item.price;
        }
    }, 0);

    const removeCartData = (index) => {
        let cart = JSON.parse(localStorage.getItem("cart")); // GET CART DATA FROM LOCALSTORAGE
        cart.splice(index, 1); // REMOVE CART PRODUCT
        localStorage.setItem("cart", JSON.stringify(cart)); // SET NEW CART DATA
        setCartCount(cart ? cart.length : 0);
        // GET PRODUCT DETAIL FROM DB
        if (cart) {
            axios
                .post(
                    "/cart",
                    {
                        cartData: cart,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("AUTH"),
                        },
                    }
                )
                .then((resp) => {
                    setCartItem(resp.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="cart__overlay">
            <div className="cart__overlay__content">
                <button
                    className="cart__overlay__close-icon"
                    onClick={handleCartMenu}
                >
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
                    </svg>
                </button>
                <div className="cart__overlay__content-container">
                    <h3 className="cart__title">Cart</h3>
                    <div className="cart__warpper">
                        <div className="position-relative">
                            <Scrollbars style={{ height: 350 }}>
                                {cartItem.map((item, index) => {
                                    return (
                                        <div
                                            className="sigle__cart__product"
                                            key={index}
                                        >
                                            <span className="cart__close-icon">
                                                <button
                                                    onClick={() =>
                                                        removeCartData(index)
                                                    }
                                                >
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 512 512"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
                                                    </svg>
                                                </button>
                                            </span>
                                            <div className="image">
                                                <Link to="/">
                                                    <img
                                                        src={item.img}
                                                        alt={item.name}
                                                        className="img-fluid"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="content">
                                                <h5>
                                                    <Link to="/">
                                                        {item.name}
                                                    </Link>
                                                </h5>
                                                <p>
                                                    <span className="cart__count">
                                                        {item.cartQuantity}
                                                        x&nbsp;
                                                    </span>
                                                    <span className="price">
                                                        {item.discount_percent !==
                                                            0 && (
                                                            <span className="line-through text-xs">
                                                                ฿
                                                                {item.price.toLocaleString()}
                                                            </span>
                                                        )}
                                                        <span className="font-bold">
                                                            {" "}
                                                            ฿
                                                            {item.discount_percent !==
                                                            0
                                                                ? (
                                                                      item.price -
                                                                      item.price *
                                                                          (item.discount_percent /
                                                                              100)
                                                                  ).toLocaleString()
                                                                : item.price.toLocaleString()}
                                                        </span>
                                                    </span>
                                                </p>
                                                {item.size && (
                                                    <p className="text-xs">
                                                        Size:{" "}
                                                        <span className="uppercase">
                                                            {item.size}
                                                        </span>
                                                    </p>
                                                )}
                                                {item.color && (
                                                    <div className="text-xs flex items-center gap-1">
                                                        Color:{" "}
                                                        <div
                                                            className={`color__cart rounded-full ${item.color}`}
                                                        ></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </Scrollbars>
                        </div>
                        <p className="cart__subtotal">
                            <span>Subtotal:</span>
                            <span className="float-end overflow-hidden">
                                &nbsp;฿{sumPrice.toLocaleString()}
                            </span>
                        </p>
                        <div className="cart__buttons">
                            <Link to="/">checkout</Link>
                        </div>
                        <p className="mt-2">
                            Free Shipping on Orders Over ฿150!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
