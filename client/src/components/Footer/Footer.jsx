import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="footer__container m-auto px-0 sm:px-20 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="text-center">
                        <h5 className="text-lg">Payment Methods</h5>
                        <div className="mt-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/5359/5359689.png"
                                alt="cash on delivery"
                                className="footer__img"
                            />
                            <img
                                src="https://plern.co/assets/images/promptpay.png"
                                alt="promptpay"
                                className="footer__img"
                            />
                        </div>
                    </div>
                    <div className="text-center mt-10 lg:mt-0">
                        <h5 className="text-lg">Delivery Services</h5>
                        <div className="mt-4">
                            <img
                                src="https://faceticket.net/wp-content/uploads/2020/06/Thaipost-Logo.jpg"
                                alt="thaipost"
                                className="footer__img"
                            />
                            <img
                                src="https://stocklittle.com/wp-content/uploads/2017/09/KERRY-express-logo.jpg"
                                alt="kerry"
                                className="footer__img"
                            />
                            <img
                                src="https://www.ninjavan.co/cover.png"
                                alt="ninjavan"
                                className="footer__img"
                            />
                            <img
                                src="https://standardexpress.online/wp-content/uploads/2020/03/best-express.png"
                                alt="best express"
                                className="footer__img"
                            />
                            <img
                                src="https://static.thairath.co.th/media/Dtbezn3nNUxytg04acy1fThNO3Ui3zjJETPoqMP21tL3L7.jpg"
                                alt="flash express"
                                className="footer__img"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
