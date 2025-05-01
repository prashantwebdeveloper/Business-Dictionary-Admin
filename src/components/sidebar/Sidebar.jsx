import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';

import { SidebarContent } from '../../constants/Data';

import Logo from "../../assets/images/logo.png";
// import Logo from "../../assets/images/logo-2.svg";
import SidebarLogo from "../../assets/images/sidebar-logo.png";

const Sidebar = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const { pathname } = useLocation();
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const handleSidebarDismiss = () => {
        if (window.innerWidth <= 576) {
            setMobileToggle(!mobileToggle);
        }
    };

    return (
        <aside id="sidebar" className={`sidebar break-point-sm has-bg-image ${sidebarToggle ? "collapsed" : ""} ${mobileToggle ? "toggled" : ""}`}>
            <Link id="btn-collapse" className={`sidebar-collapser`} onClick={() => setSidebarToggle(!sidebarToggle)}>
                <i className="ri-arrow-left-s-line" />
            </Link>
            <div className="sidebar-layout">
                <div className="sidebar-header">
                    <Link to="/admin/dashboard" className="pro-sidebar-logo" onClick={handleSidebarDismiss}>
                        <img src={`${sidebarToggle ? SidebarLogo : SidebarLogo}`} alt="logo" className={`${sidebarToggle ? "logo-img" : "full-fluid"}`} width={80} />
                    </Link>

                    <span className="menu-title">Business</span>
                </div>

                <nav className="menu open-current-submenu">
                    <ul>
                        {
                            SidebarContent?.map((i, index) => {
                                return (
                                    <li className="menu-item" key={index}>
                                        {
                                            i.onClick === "logout" ? (
                                                <Link
                                                    onClick={i?.onClick === "logout" ? handleLogout : null}
                                                >
                                                    <span className="menu-icon">
                                                        {i.icon}
                                                    </span>
                                                    <span className="menu-title">
                                                        {i.label}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <NavLink
                                                    to={i.route}
                                                    className={`d-flex align-items-center
                                                        ${
                                                            i.route === "/admin/user" && pathname.startsWith("/admin/user") ||
                                                            i.route === "/admin/category" && pathname.startsWith("/admin/category")
                                                            ? 'active' : ''
                                                        }    
                                                    `}
                                                    onClick={handleSidebarDismiss}
                                                >
                                                    <span className="menu-icon">
                                                        {i.icon}
                                                    </span>
                                                    <span className="menu-title">
                                                        {i.label}
                                                    </span>
                                                </NavLink>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;





// className={`d-flex align-items-center
//     ${
//         i.route === "/admin/doctor" && pathname.startsWith("/admin/doctor-details") ||
//         i.route === "/admin/patient" && pathname.startsWith("/admin/doctor-details")
//         ? 'active' : ''
//     }
// `}