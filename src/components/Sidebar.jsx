import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { BsBox2Fill } from "react-icons/bs";
import logo from "../imgs/logoWhite.png";
import { FaKey } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { BsFillBuildingsFill } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { handleLogout, existToAdmin } from "../Services";
import DeleteModal from "./Modals/DeleteModal";
import { BsBuildingsFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
const Sidebar = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  let [user, setuser] = useState({});
  let [modal, setModal] = useState(false);
  let conexParent = localStorage.getItem("conexParent");
  let loginBy = localStorage.getItem("loginBy");
  let connexUid = localStorage.getItem("connexUid");

  let handleModal = () => {
    setModal(!modal);
  };

  // --------------------------geting the user data from firebase------------------------

  // useEffect(() => {
  //   let getingdata = async () => {
  //     const starCountRef = ref(db, `/User/${userId}`);
  //     onValue(starCountRef, async (snapshot) => {
  //       const data = await snapshot.val();

  //       setuser(data);
  //     });
  //   };

  //   getingdata();
  // }, []);

  let logOut = () => {
    let promise = new Promise((res, rej) => {
      res(localStorage.removeItem("inventoryKey"));
    });

    promise.then(() => {
      navigate("/Login");
    });
    window.location.reload();
    // setModal(!modal);
  };

  let currentPath = window.location.href;

  let [deleteModal, setdeleteModal] = useState(false);
  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  const language = localStorage.getItem("connexLanguage");

  const pathName = window.location.pathname;

  return (
    <div className="w-[20%] h-[100vh]  flex flex-col sticky shadow-2xl bg-black">
      <DeleteModal
        deleteModal={deleteModal}
        handledeleteModal={handledeleteModal}
        text={t("Are you sure to logout ?")}
        func={() => handleLogout(navigate("/signin"))}
      />
      <div className="h-[94vh]  w-[100%] flex flex-col justify-between items-center">
        <div className="h-[85%]  w-[90%] flex flex-col">
          <div className="h-[15%]  w-[100%] flex items-center justify-center mt-3">
            <img src={logo} alt="conex" className="h-[30px] w-[160px]" />
            {/* <h2 class=" text-xl font-medium ml-2 text-black">Inventory</h2> */}
          </div>
          <div className="h-max  w-[100%]   mt-5 ">
            <div
              className="hover:bg-[#40483e] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer "
              onClick={() => navigate("/home")}
              style={
                currentPath.includes("/home") || currentPath.includes("/edit")
                  ? { backgroundColor: "#3fb621", color: "white" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md  ml-2 w-[100%]">
                {conexParent != "superAdmin" ? (
                  <div className="w-[19%]  ">
                    <FaUser className="text-xl ml-2 " />
                  </div>
                ) : (
                  <BsBuildingsFill className="text-xl ml-2 " />
                )}
                <p className="ml-[10px] text-[13px] font-[600]">
                  {conexParent === "superAdmin"
                    ? "Companies"
                    : t("Team Members")}
                </p>
              </div>
            </div>
            {conexParent != "superAdmin" && (
              <>
                <div
                  className="hover:bg-[#40483e] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
                  onClick={() => navigate("/subteams")}
                  style={
                    currentPath.includes("/subteams")
                      ? { backgroundColor: "#3fb621", color: "white" }
                      : null
                  }
                >
                  <div className=" flex items-center rounded-md   ml-2  w-[100%]">
                    <div className="w-[19%]  ">
                      <IoIosPeople className="text-3xl ml-1 " />
                    </div>

                    <p className="ml-[10px] text-[13px] font-[600]  w-[40%]">
                      {t("Sub Teams")}
                    </p>
                  </div>
                </div>

                <div
                  className="hover:bg-[#40483e] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
                  onClick={() => navigate("/leads-reviews")}
                  style={
                    currentPath.includes("/leads-reviews")
                      ? { backgroundColor: "#3fb621", color: "white" }
                      : null
                  }
                >
                  <div className=" flex items-center rounded-md ml-2 w-[100%]">
                    <div className="w-[19%]  ">
                      <FaFilter className=" text-xl ml-2 " />
                    </div>
                    <p className="ml-[10px] text-[13px] font-[600]">
                      {t("Leads & Reviews")}
                    </p>
                  </div>
                </div>
                
                {/* <div
                  className="hover:bg-[#40483e] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
                  onClick={() => navigate("/reviews")}
                  style={
                    currentPath.includes("/reviews")
                      ? { backgroundColor: "#3fb621", color: "white" }
                      : null
                  }
                >
                  <div className=" flex items-center rounded-md ml-2 w-[100%]">
                    <div className="w-[19%]  ">
                    <BiSolidMessageRoundedDots className=" text-xl ml-2 " />
                    </div>
                    <p className="ml-[10px] text-[13px] font-[600]">
                      {t("Google Reviews")}
                    </p>
                  </div>
                </div> */}

                <div
                  className="hover:bg-[#40483e] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
                  onClick={() => navigate("/analytics")}
                  style={
                    currentPath.includes("/analytics")
                      ? { backgroundColor: "#3fb621", color: "white" }
                      : null
                  }
                >
                  <div className=" flex items-center rounded-md   ml-2 w-[100%]">
                    <div className="w-[19%]  ">
                      <SiGoogleanalytics className=" text-xl ml-2 " />
                    </div>
                    <p className="ml-[10px] text-[13px] font-[600]">
                      {t("Analytics")}
                    </p>
                  </div>
                </div>

                <div
                  className="hover:bg-[#40483e] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
                  onClick={() => navigate("/company")}
                  style={
                    pathName === "/company"
                      ? { backgroundColor: "#3fb621", color: "white" }
                      : null
                  }
                >
                  <div className=" flex items-center rounded-md   ml-2 w-[100%]">
                    <div className="w-[19%]  ">
                      <BsFillBuildingsFill className=" text-xl ml-2 " />
                    </div>

                    <p className="ml-[10px] text-[13px] font-[600]">
                      {t("Company")}
                    </p>
                  </div>
                </div>
                {(conexParent != "superAdmin" && loginBy == "admin") && (
                <div
                  className="hover:bg-[#40483e] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
                  onClick={() => existToAdmin(navigate)}
                 
                >
                  <div className=" flex items-center rounded-md   ml-2 w-[100%]">
                    <div className="w-[19%]  ">
                      <RiAdminFill className=" text-xl ml-2 " />
                    </div>

                    <p className="ml-[10px] text-[13px] font-[600]">
                      {t("Exit to Admin")}
                    </p>
                  </div>
                </div> 
                )}
              </>
            )}
          </div>
        </div>
        <div className="h-[10%]  w-[90%] flex flex-col justify-end ">
          <div
            className="h-[36px]  w-[95px]  flex items-center  justify-center rounded-[34px] cursor-pointer gap-2 ml-2 hover:bg-[#000000] border border-transparent hover:border-[#ffffff] bg-[#3fb621]"
            onClick={() => handledeleteModal()}
          >
            {" "}
            {language === "en" && (
              <RiLogoutCircleLine className="text-white text-lg " />
            )}
            <p className="font-[600] text-[12px] text-white  text-center">
              {t("Logout")}
              {/* Logout */}
            </p>
          </div>
        </div>
      </div>
      {/* <ToastContainer
        position="bottom-left"
        autoClose={1000}
        theme="colored"
        hideProgressBar
      /> */}
      {/* <LogoutModal
        modal={modal}
        handleModal={handleModal}
        logoutFunc={logOut}
      /> */}
    </div>
  );
};

export default Sidebar;
