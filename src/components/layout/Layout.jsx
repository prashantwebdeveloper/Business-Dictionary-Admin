import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import Logout from '../modal/logout/Logout';

import { useAuth } from '../../context/auth/AuthContext';
import { SignOutUser } from '../../firebase/services/auth/logout/LogoutServices';
import { toast } from 'react-toastify';

export const AuthLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("business-admin-token");

    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate("/admin/dashboard");
        }
    }, [currentUser, navigate]);

    return (
        <>
            {
                !currentUser && <Outlet />
            }
        </>
    )
}


export const DefaultLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("business-admin-token");
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);


    const [mobileToggle, setMobileToggle] = useState(false);

    // Logout-Modal
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const [logoutModalShow, setLogoutModalShow] = useState(false);

    const handleLogout = () => {
        setLogoutModalShow(true);
    }

    const handleClose = () => {
        setLogoutModalShow(false);
    }

    const confirmLogout = async () => {
        setIsLogoutLoading(true);

        try {
            const res = await SignOutUser();
            console.log("Res-Logout++", res);

            if (res?.success) {
                toast.success("Admin Logged out successfully");
                handleClose();

                localStorage.removeItem("business-admin-token");
                navigate("/");
            }
        } catch (err) {
            console.error("Error-Res-Logout", err);
        } finally {
            setIsLogoutLoading(false);
        }
    }
    return (
        <>

            {
                currentUser && (
                    <>
                        <div className="layout">
                            <div className="main-section">
                                <div className="layout has-sidebar fixed-sidebar fixed-header">
                                    <Sidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                                    <div className="layout">
                                        <main className="content">
                                            <div>
                                                <Header mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                                                <Outlet />
                                            </div>
                                        </main>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Logout Modal */}
                        <Logout show={logoutModalShow} handleClose={handleClose} isLogoutLoading={isLogoutLoading} handleLogout={confirmLogout} />
                    </>
                )
            }

        </>
    )
}   