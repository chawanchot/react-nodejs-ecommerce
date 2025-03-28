import React from "react";
import "./HomeSlides.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function HomeSlides() {
    const setting = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <div className="slide__content__home">
            <Slider {...setting}>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1605513524006-063ed6ed31e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1952&q=80"
                        alt="banner 1"
                    />
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1635405074683-96d6921a2a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                        alt="banner 2"
                    />
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt="banner 3"
                    />
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                        alt="banner 4"
                    />
                </div>
            </Slider>
        </div>
    );
}

export default HomeSlides;
