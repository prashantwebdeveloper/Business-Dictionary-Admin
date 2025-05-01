import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import User from "../../assets/images/user.jpg";

const Header = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const { pathname } = useLocation();

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (pathname.startsWith("/admin/")) {
            const path = pathname.replace("/admin", "");

            if (path === "/dashboard") {
                setTitle("Dashboard")
            }
            if (path.startsWith("/user")) {
                setTitle("User")
            }
            else if (path.startsWith("/category")) {
                setTitle("Category")
            }
            else if (path === "/subscription") {
                setTitle("Subscription")
            }
            
        }
    }, [pathname]);

    return (
        <>
            <div className="nav navbar navbar-expand-xl navbar-light iq-navbar">
                <div className="container-fluid navbar-inner mb-2">
                    <h5 className="site-menu-title mb-0">
                        {title || ""}
                    </h5>

                    <ul className="navbar-nav navbar-list ms-auto">
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link d-flex align-items-center position-relative ps-3 p-0"
                                href="#"
                                id="profile-dropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img
                                    src={User}
                                    // src="https://demo.dashboardpack.com/user-management-html/img/client_img.png"
                                    alt="User-Profile"
                                    style={{
                                        width: "43px",
                                        height: "43px",
                                        // background: "#800CAF" 
                                    }}
                                    className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                    loading="lazy"
                                />
                            </Link>

                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile-dropdown">
                                <li onClick={() => handleLogout()}>
                                    <Link className="dropdown-item" style={{ fontWeight: "400" }}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <button id="btn-toggle" className="border-0 sidebar-toggler break-point-sm btn-line" onClick={() => setMobileToggle(!mobileToggle)}>
                        <i className="ri-menu-line ri-xl" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header;