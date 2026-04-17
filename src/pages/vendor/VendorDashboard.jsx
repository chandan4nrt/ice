import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Topbar from "../../components/Topbar";
import "../../css/dashboard.css";
import { useAuth } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import OrderCard from "../../components/OrderCard";

export default function VendorDashboard() {
const { user } = useAuth(); 
 const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const outlet = useOutletContext();
  const openSidebar = outlet?.openSidebar;
  const orders = [
    {
      id: "REP58475",
      date: "Tuesday, 23 April, 10:32 AM",
      items: 1,
      qty: 15,
      status: "Completed",
      icon: "../images/icons/request.png",
    },
    {
      id: "REP78459",
      date: "Tuesday, 22 April, 12:52 PM",
      items: 4,
      qty: 52,
      status: "In Process",
      icon: "../images/icons/request.png",
    },
    {
      id: "REP68485",
      date: "Tuesday, 19 April, 02:32 PM",
      items: 2,
      qty: 24,
      status: "Rejected",
      icon: "../images/icons/request.png",
    },
    {
      id: "REP22547",
      date: "Tuesday, 18 April, 04:56 PM",
      items: 2,
      qty: 36,
      status: "Completed",
      icon: "../images/icons/request.png",
    },
  ];



  return (
    <>

      <div className="mainpro">

        <div className="container">
          <div className="dashboard">

            {/* HEADER */}

                   <div className="header">
              <div>
                <h1>{user?.name || user?.fullName || user?.username || "Welcome"}</h1>
                <p>{today}</p>
              </div>

              {/* ??  user's profile image with a fallback */}
              <img
                className="profile"
                src={
                  user?.profileImage ||
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.fullName || "User")}&background=random`
                }
                alt="Profile"
              />
            </div>
            {/* <div className="header">
              <div>
                <h1>Sanjeev Kumar</h1>
                <p>Tuesday, April 23</p>
              </div>

              <img
                className="profile"
                src="https://randomuser.me/api/portraits/men/32.jpg"
              />
            </div> */}

            {/* STATS */}
            <div className="vendor-stats">

              <div className="darkbox">
                <p>Total Stock</p>
                <h3 className="greencolor">
                  325 <span className="graycolor">Boxs</span>
                </h3>
              </div>

              <div className="darkbox">
                <p>Total Sales</p>
                <h3 className="limecolor">
                  284 <span className="graycolor">Boxs</span>
                </h3>
              </div>

            </div>

            {/* SLIDER */}
            <div className="slider">

              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
              >

                <SwiperSlide>
                  <div className="slide">
                    <img src="../images/banner/banner.jpg" />

                    <div className="sliderText">
                      <h3>Drop an Iceberg. Elevate Your Drink.</h3>
                      <p>Experience Ice With an Edge.</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="slide">
                   <img src="../images/banner/banner.jpg" />

                    <div className="sliderText">
                      <h3>Premium Ice Cubes</h3>
                      <p>Crystal clear ice for premium drinks.</p>
                    </div>
                  </div>
                </SwiperSlide>

              </Swiper>

            </div>

            {/* LAST ORDERS */}
            <div className="orders">

              <div className="ordersHeader">
                <h3>Your Last Order</h3>
                <span className="text-white">View All</span>
              </div>

              {orders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))}
            </div>

          </div>


        </div>
      </div>
    </>
  );
}
