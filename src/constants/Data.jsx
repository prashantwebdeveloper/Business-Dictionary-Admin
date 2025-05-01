import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons";
import { FaUserDoctor } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { RiFileList3Line } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { MdMiscellaneousServices, MdSubscriptions } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";

export const SidebarContent = [
    {
        label: "Dashboard",
        icon: <RxDashboard />,
        route: "/admin/dashboard",
    },
    {
        label: "User",
        icon: <FaUserCog />,
        route: "/admin/user",
    },
    {
        label: "Category",
        icon: <TbCategoryFilled />,
        route: "/admin/category",
    },
    {
        label: "Subscription",
        icon: <MdSubscriptions />,
        route: "/admin/subscription",
    },
    {
        label: "Logout",
        icon: <i className="ri-logout-box-r-line"></i>,
        onClick: "logout",
    }
];


export const DashboardContent = [
    {
        title: "Total User",
        icon: <FaUserCog />,
        route: "/admin/user",
        apiCount: "totalUser"
    },
    {
        title: "Total Category",
        icon: <TbCategoryFilled />,
        route: "/admin/category",
        apiCount: "totalCategory"
    },
    {
        title: "Total Subscription",
        icon: <MdSubscriptions />,
        route: "/admin/subscription",
        apiCount: "totalSubscription"
    }
];







