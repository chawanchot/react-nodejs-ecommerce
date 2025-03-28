import React from "react";
import useAuth from "../../hooks/useAuth";
import Menu from "./Menu";
import moment from 'moment-timezone';
import "moment/locale/th"


function Profile() {
    const { profile } = useAuth();

    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row w-full gap-3">
                <div>
                    <Menu page="profile" />
                </div>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg text-center leading-6 text-gray-900 font-bold">
                            Profile
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                    { profile.fname } { profile.lname }
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Phone
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                    { profile?.phone }
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                    { profile?.address }
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Signup on
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                    { moment().locale("en").tz("Asia/Bangkok").format("D MMM YYYY HH:mm") }
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
