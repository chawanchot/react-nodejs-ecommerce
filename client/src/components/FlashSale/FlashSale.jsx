import React from "react";
import "./FlashSale.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard";

function FlashSale() {
    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="control-btn" onClick={onClick}>
                <button className="next">
                    <i className="fa fa-long-arrow-alt-right"></i>
                </button>
            </div>
        );
    };

    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="control-btn" onClick={onClick}>
                <button className="prev">
                    <i className="fa fa-long-arrow-alt-left"></i>
                </button>
            </div>
        );
    };

    const setting = {
        dots: false,
        infinite: false,
        speed: 150,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const ProductData = [
        {
            id: 1,
            name: "Nike Dunk Retro White-Black",
            img: "https://i.imgur.com/qmMRjsk.png",
            price: 5600,
            discount_percent: 10,
        },
        {
            id: 2,
            name: "GoPro Hero11 Black",
            img: "https://media.discordapp.net/attachments/1060254771535151194/1060262116818432080/20220913_051229_gopro-hero-11-black_2_-removebg-preview.png",
            price: 18500,
            discount_percent: 10,
        },
        {
            id: 3,
            name: "DJI OSMO Action 3",
            img: "https://media.discordapp.net/attachments/1060254771535151194/1060262620319457340/20220909_080533_DJI_ACTION_3-removebg-preview.png",
            price: 12500,
            discount_percent: 8,
        },
        {
            id: 4,
            name: "Razer Viper V2 Pro Wireless Gaming Mouse",
            img: "https://media.discordapp.net/attachments/1060254771535151194/1060264077391314954/razer-viper-v2-pro-wireless-gaming-mouse-black-full-view-removebg-preview.png",
            price: 5490,
            discount_percent: 20,
        },
        {
            id: 5,
            name: "Razer Iskur Premium Gaming Chair",
            img: "https://media.discordapp.net/attachments/1060254771535151194/1060264410121244732/razer-iskur-premium-gaming-chair-standard-leather-green-black-front-removebg-preview.png",
            price: 17900,
            discount_percent: 18,
        },
        {
            id: 6,
            name: "Zowie XL2746K 27inch TN Gaming Monitor 240Hz",
            img: "https://media.discordapp.net/attachments/1060254771535151194/1060264976171925514/zowie-xl2746k-27-tn-gaming-monitor-240hz-top-removebg-preview.png",
            price: 23900,
            discount_percent: 16,
        },
    ];

    return (
        <div className="flash__container">
            <h3 className="font-bold text-2xl text-center">
                <span className="text-yellow-400">
                    <i className="fa-solid fa-bolt-lightning"></i>
                </span>{" "}
                Flash Sale
            </h3>
            <div className="mt-5">
                <Slider {...setting}>
                    {ProductData.map((item, index) => {
                        return (
                            <div key={index}>
                                <ProductCard data={item} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}

export default FlashSale;
