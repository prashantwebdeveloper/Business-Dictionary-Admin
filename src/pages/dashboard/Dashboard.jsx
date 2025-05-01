import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { DashboardContent } from '../../constants/Data';
import { GetUsersFirebase } from '../../firebase/services/user/UserServices';
import { GetCategoryFirebase } from '../../firebase/services/category/CategoryServices';
import { GetSubscriptionFirebase } from '../../firebase/services/subscription/SubscriptionServices';

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({
        totalUser: null,
        totalCategory: null,
        totalSubscription: null,
    });

    const GetUsersList = async () => {
        try {
            const res = await GetUsersFirebase();
            console.log("Res-Users-Dashboard++", res);

            setDashboard((prev) => ({
                ...prev,
                totalUser: res?.length,
            }));

        } catch (err) {
            console.error("Error-Res-Users-Dashboard", err);
        }
    }

    const GetCategoryList = async () => {
        try {
            const res = await GetCategoryFirebase();
            console.log("Res-Category-Dashboard++", res);

            setDashboard((prev) => ({
                ...prev,
                totalCategory: res?.length,
            }));

        } catch (err) {
            console.error("Error-Res-Category-Dashboard", err);
        }
    }


    const GetSubscriptionList = async () => {
        try {
            const res = await GetSubscriptionFirebase();
            console.log("Res-Subscription-Dashboard++", res);

            setDashboard((prev) => ({
                ...prev,
                totalSubscription: res?.length,
            }));

        } catch (err) {
            console.error("Error-Res-Subscription-Dashboard", err);
        }
    }

    useEffect(() => {
        GetUsersList();
        GetCategoryList();
        GetSubscriptionList();
    }, []);


    return (
        <>

            <div className="dashboard">
                <div className="row gx-5 mb-5">

                    {
                        DashboardContent?.map((i, index) => {
                            return (
                                <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4" key={index}>
                                    <Link to={i.route}>
                                        <div className="card shadow border-0">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                            {i.title}
                                                        </span>
                                                        <span className="mb-0 card-title">
                                                            {dashboard[i.apiCount] || 0}
                                                        </span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                            {i.icon}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </>
    )
}

export default Dashboard;






{/* <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to={'/admin/patient'}>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Patient
                                            </span>
                                            <span className="mb-0 card-title">
                                                0
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <FontAwesomeIcon icon={faBedPulse} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to={'/admin/booking'}>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Booking
                                            </span>
                                            <span className="mb-0 card-title">
                                                0
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <RiFileList3Line />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to={'/admin/help-support'}>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Help & Support
                                            </span>
                                            <span className="mb-0 card-title">
                                                0
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <BiSupport />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-xl-3 col-md-6 col-12 mt-lg-5 mt-4">
                        <Link to={'/admin/notification'}>
                            <div className="card shadow border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h6 fw-semibold text-muted text-sm d-block mb-2 title">
                                                Total Notification
                                            </span>
                                            <span className="mb-0 card-title">
                                                0
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle">
                                                <IoMdNotifications />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div> */}