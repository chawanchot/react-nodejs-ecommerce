import React from "react";

function Subscribe() {
    return (
        <section className="py-24">
            <div className="text-center">
                <h2 className="font-bold text-2xl sm:text-4xl">Join With Us! </h2>
                <p className="text-sm sm:text-lg">Subscribe to our newsletter to receive news on update</p>
                <div>
                    <form className="mt-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-5/6 sm:w-1/2 h-14 text-xl border-b-2 text-center focus:outline-none focus:placeholder:text-transparent"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-36 py-3 rounded-3xl mt-5 text-base font-bold bg-red-500 text-white uppercase"
                            >
                                subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Subscribe;
