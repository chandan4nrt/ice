


import { useEffect, useState } from "react";
import { Outlet, useNavigate, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BackHeader from "./BackHeader";
import BottomNav from "./BottomNav";
import PullToRefresh from "../components/PullToRefresh";
 
import { usePopup } from "../context/PopupContext";
import Popup from "./Popup";
import { Plus } from "lucide-react";

function Layout({ logoUrl, onMenuClick, setLogoUrl }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const hideLayout = pathname === "/login";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const [studentsData, setStudentsData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    // const { isOpen,popupConfig, closePopup } = usePopup();
    const API_URL = import.meta.env.VITE_API_URL;

    const hideBackHeader =
        pathname === "/admin/dashboard" ||
        pathname === "/student/dashboard" ||
        pathname === "/teacher/dashboard";

    // Fetch students data for admin
    // useEffect(() => {
    //     if (user?.role === "ADMIN") {
    //         fetch(`${API_URL}/students`)
    //             .then((res) => res.json())
    //             .then((data) => setStudentsData(Array.isArray(data) ? data : []))
    //             .catch(() => setStudentsData([]));
    //     }
    // }, [user]);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div>
            {!hideLayout && (
                <Sidebar
                    user={user}
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    logoUrl={logoUrl}
                />
            )}

            <div className="maincontainer">
                {!hideLayout &&
                    (pathname === "/admin/dashboard" ||
                        pathname === "/sales/dashboard" ||
                        pathname === "/vendor/dashboard") && (
                        <Topbar
                            user={user}
                            onMenuClick={() => setSidebarOpen(true)}
                            logoUrl={logoUrl}
                        />
                    )}

                {!hideBackHeader && <BackHeader logoUrl={logoUrl} />}


                <div className={`mainbody ${isMobile ? "mobile" : "desktop"}`}>
  {/* <AnimatePresence mode="wait"></AnimatePresence> */}
 
      <PullToRefresh disabled={!isMobile}>
        <Outlet />
      </PullToRefresh>
    

</div>

            </div>
            <div id="popup-root"></div>
           {pathname.startsWith("/vendor/retailer-order") && (
            <button className="retailerFab" onClick={() => navigate("/vendor/create-retailer-order")} >
                <Plus size={22} />
            </button>
            )}

            {!hideLayout && <BottomNav user={user} logoUrl={logoUrl} onClose={()=> setSidebarOpen(false)} />}
        </div>
    );
}

export default Layout;
