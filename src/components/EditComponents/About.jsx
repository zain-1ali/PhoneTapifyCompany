import styled from "@emotion/styled";
import { FormControlLabel, Switch } from "@mui/material";
import { MdColorize, MdOutlineCancel } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { BiImage } from "react-icons/bi";
import { PiUserRectangleFill } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import bgplhldr from "../../imgs/bgplhldr.png";
import lgoplchldr from "../../imgs/lgoplchldr.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setColor,
  setPhone,
  setCoverUrl,
  setProfileurl,
  setDesignation,
  setAddress,
  setBio,
  setPoweredVizz,
  setTextColor,
  setbtnColor,
  setShareBtnColor,
  setlinkColor,
  setlinkBgColor,
  setLogoUrl,
  setOrganizationCover,
  setOrgLogo,
  setOrganizationProfile,
  setLead,
  setDark,
} from "../../redux/profileInfoSlice.js";
import Cropper from "../Cropper.jsx";
import {
  getSingleChild,
  handleChangeDirect,
  removeSubscription,
  updataAbout
} from "../../Services.jsx";
import SocialLinkModal from "../Modals/SocialLinkModal.jsx";
import { useTranslation } from "react-i18next";
import { FiMinusCircle } from "react-icons/fi";
import SubscriptionModal from "../Modals/SubscriptionModal.jsx";
import { useParams } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal.jsx";

const About = ({ uid, handleCancelAbout }) => {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      // disableRipple

      {...props}
    />
  ))(({ theme }) => ({
    width: 38,
    height: 22,
    padding: 0,
    // position: "relative",
    // right: 0,
    // marginLeft: "50px",
    // border: "1px solid black",

    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme?.palette?.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme?.palette?.mode === "light"
            ? theme?.palette?.grey[100]
            : theme?.palette?.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme?.palette?.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 18,
      height: 18,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme?.palette?.mode === "light" ? "#E9E9EA" : "#BBBBBB",
      opacity: 1,
      transition: theme?.transitions?.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  var screen = window.innerWidth;

  const [isCompanyActive, setIsCompanyActive] = useState(false);
  const [subscription, setsubscription] = useState({});

  let dispatch = useDispatch();

  const name = useSelector((state) => state.profileInfoSlice.name);
  const email = useSelector((state) => state.profileInfoSlice.email);
  const color = useSelector((state) => state.profileInfoSlice.color);
  const textColor = useSelector((state) => state.profileInfoSlice.textColor);
  const phone = useSelector((state) => state.profileInfoSlice.phone);
  const cover = useSelector((state) => state.profileInfoSlice.coverUrl);
  const profile = useSelector((state) => state.profileInfoSlice.profileUrl);
  const logo = useSelector((state) => state.profileInfoSlice.logoUrl);
  const address = useSelector((state) => state.profileInfoSlice.address);
  const bio = useSelector((state) => state.profileInfoSlice.bio);

  const shareBtnColor = useSelector(
    (state) => state.profileInfoSlice.shareBtnColor
  );
  const organizationProfile = useSelector(
    (state) => state.profileInfoSlice.organizationProfile
  );
  const organizationLogo = useSelector(
    (state) => state.profileInfoSlice.organizationLogo
  );
  const organizationCover = useSelector(
    (state) => state.profileInfoSlice.organizationCover
  );

  const leadMode = useSelector((state) => state.profileInfoSlice.leadMode);
  const links = useSelector((state) => state.profileInfoSlice.links);
  const directMode = useSelector((state) => state.profileInfoSlice.directMode);
  let darkTheme = useSelector((state) => state.profileInfoSlice.darkTheme);
  const designation = useSelector(
    (state) => state.profileInfoSlice.designation
  );
  darkTheme = (darkTheme == "0" || darkTheme == 0 || darkTheme == false) ? false : true;

  let [prflKey, setPrflKey] = useState(0);
  let [logoKey, setLogoKey] = useState(0);
  let [coverKey, setCoverKey] = useState(0);

  const handleDarkModeChange = () => {
    try {
      dispatch(setDark(!darkTheme )); // Update Redux store
      dispatch(setTextColor(darkTheme ? "#000000" : "#ffffff"))
    } catch (error) {
      console.error("Failed to update lead mode:", error);
    }
  };


  // ----------------------------------------------------State setup for profile img crop---------------------------------------------
  let [prflimg, setprflimg] = useState(null);
  let [cropModal, setcropModal] = useState(false);
  let [myprflimg, setmyprflimg] = useState(null);
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosecropper = () => {
    setcropModal(false);
    // settheimg(null)
  };

  let handlePrflImageChange = (event) => {
    // profileImage
    setprflimg("");
    const { files } = event.target;

    setPrflKey(prflKey + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setprflimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setcropModal(true);
      });
    }
  };

  // ----------------------------------------------------State setup for logo img crop---------------------------------------------
  let [logoimg, setlogoimg] = useState(null);
  let [cropLogoModal, setcroplogoModal] = useState(false);
  let [mylogolimg, setmylogolimg] = useState(null);
  let [croplogo, setCroplogo] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handlecloselogocropper = () => {
    setcroplogoModal(false);
    // settheimg(null)
  };

  let handleLogoImageChange = (event) => {
    // profileImage
    setlogoimg("");
    const { files } = event.target;
    setLogoKey(logoKey + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setlogoimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setcroplogoModal(true);
      });
    }
  };

  // ----------------------------------------------------State setup for bg img crop---------------------------------------------

  let [bgimg, setbgimg] = useState(null);
  let [bgCropModal, setBgcropModal] = useState(false);
  let [mybgimg, setmybgimg] = useState(null);
  let [cropbg, setCropbg] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosebgcropper = () => {
    setBgcropModal(false);
  };

  let handlebgImageChange = (event) => {
    // profileImage
    setbgimg("");
    const { files } = event.target;

    setCoverKey(coverKey + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setbgimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setBgcropModal(true);
      });
    }
  };

  let data = {
    name,
    email,
    job: designation,
    address,
    coverUrl: cover,
    phone,
    bio,
    profileUrl: profile,
    logoUrl: logo,
    backgroundColor: color,
    textColor,
    leadMode: leadMode,
    darkTheme: darkTheme,
  };

  let [modal, setModal] = useState(false);
  let handleModal = () => {
    setModal(!modal);
  };

  let [companyId, setCompanyId] = useState("");
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");
  let [companyProfile, setCompanyProfile] = useState({});
  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);

  let getCompanyData = (data) => {
    dispatch(setOrganizationCover(data?.[companyId]?.coverUrl));
    dispatch(setOrgLogo(data?.[companyId]?.logoUrl));
    dispatch(setOrganizationProfile(data?.[companyId]?.profileUrl));
    setCompanyProfile(Object.values(data)[0]);
    // console.log(data);
  };

  let getSubscribeData = (data) => {
    setsubscription(data?.[uid]?.subscription);
    setIsCompanyActive(data?.[uid]?.isActiveCompany);
  };

  useEffect(() => {
    getSingleChild(companyId, getCompanyData);
  }, [companyId]);

  useEffect(() => {
    getSingleChild(uid, getSubscribeData);
  }, [uid]);

  const { t } = useTranslation();

  // if (conexParent != "superAdmin") {

  const [subscribeModal, setsubscribeModal] = useState(false);

  const handlesubscribeModal = () => {
    setsubscribeModal(!subscribeModal);
  };

  const appendBucketPath = (path) => {
    if (path.startsWith("gs://")) {
      const filterUrl = path.replace("gs://phonetapify-c6c06.appspot.com/", "");
      return `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${encodeURIComponent(filterUrl)}?alt=media`;
    } 
    return path; // Return the same path if it doesn't start with "gs://"
  };

  // console.log(subscription);

  // convert time stamp to readable date
  const returnDate = (timestampInSeconds) => {
    if (timestampInSeconds) {
      // Convert to milliseconds
      const timestampInMilliseconds = timestampInSeconds * 1000;

      // Create a new Date object
      const date = new Date(timestampInMilliseconds);

      // Format the date
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      return formattedDate;
    } else {
      return "";
    }
  };

  // to remove subscription modal state handeling

  let [deleteModal, setdeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setdeleteModal(!deleteModal);
  };
  let [saveModal, setSaveModal] = useState(false);

  const handleSaveModal = () => {
    setSaveModal(!saveModal);
  };

  return (
    <div className="w-[90%] h-[90%] overflow-y-scroll scroll-area">
      {/* --------------------------------------------croper for logo image------------------------------------------------  */}
      <Cropper
        cropModal={cropLogoModal}
        handleclosecropper={handlecloselogocropper}
        theimg={logoimg}
        myimg={mylogolimg}
        setmyimg={setmylogolimg}
        setcrop={setCroplogo}
        crop={croplogo}
        // aspect={1 / 1}
        setReduxState={setLogoUrl}
        isCircle={false}
      />
      {/* --------------------------------------------croper for profile image------------------------------------------------  */}
      <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={prflimg}
        myimg={myprflimg}
        setmyimg={setmyprflimg}
        setcrop={setCropPrfl}
        crop={cropPrfl}
        aspect={1 / 1}
        setReduxState={setProfileurl}
        isCircle={false}
      />

      {/* --------------------------------------------croper for Cover image------------------------------------------------  */}
      <Cropper
        cropModal={bgCropModal}
        handleclosecropper={handleclosebgcropper}
        theimg={bgimg}
        myimg={mybgimg}
        setmyimg={setmybgimg}
        setcrop={setCropbg}
        crop={cropbg}
        aspect={253 / 150}
        setReduxState={setCoverUrl}
        isCircle={false}
      />

      <SubscriptionModal
        subscribeModal={subscribeModal}
        handlesubscribeModal={handlesubscribeModal}
        id={uid}
      />

      <DeleteModal
        deleteModal={deleteModal}
        handledeleteModal={handleDeleteModal}
        text="Are you sure to remove pro version"
        func={() => removeSubscription(uid, handleDeleteModal)}
      />
      <DeleteModal
      deleteModal={saveModal}
      handledeleteModal={handleSaveModal} 
      text="Are you sure you want to save the changes?"
      func={() => {
        updataAbout(uid, data, t);  // Fixed typo from "updata" to "update"
        getSingleChild(companyId, getCompanyData);
      }}
    />

      <SocialLinkModal modal={modal} handleClose={handleModal} uid={uid} />
      <div className="w-[100%] flex justify-between ">
        {conexParent != "superAdmin" ? (
          <div className="sm:w-[35%] w-[35%] h-[50px]  rounded-[36px] shadow-lg flex justify-center items-center ">
            <div className="flex w-[100%] items-center  justify-around ">
              <p className="font-[500] sm:text-[14px] text-[10px] whitespace-nowrap ml-2">
                {t("Lead Mode")} {"\u00A0"} {"\u00A0"} {"\u00A0"}
              </p>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={leadMode}
                    onChange={ () => dispatch(setLead(!leadMode ))}
                  />
                }
              />
            </div>

            {/* <div className="flex w-[50%] items-center  justify-around ">
              <p className="font-[500]  sm:text-[14px] text-[10px] whitespace-nowrap ml-2">
                {t("Direct Mode")} {"\u00A0"}
              </p>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={directMode}
                    onChange={() => handleChangeDirect(directMode, uid, links)}
                  />
                }
              />
            </div> */}
          </div>
        ) : (
          <div className="sm:w-[55%] w-[70%] h-[50px]  rounded-[36px] shadow-lg flex justify-between items-center border">
            <div className="w-[50%] h-[100%] mt-2  border-r">
              <h2 className="font-[500] text-[12px] text-center">
                Pro version start date
              </h2>
              <p className="font-[400] text-[11px] text-center">
                {returnDate(subscription?.proVersionPurchaseDate)}
              </p>
            </div>

            <div className="w-[50%] h-[100%] mt-2">
              <h2 className="font-[500] text-[12px] text-center">
                Pro version end date
              </h2>
              <p className="font-[400] text-[11px] text-center">
                {returnDate(subscription?.proVersionExpireyDate)}
              </p>
            </div>
          </div>
        )}

        {"\u00A0"}
        {conexParent === "superAdmin" ? (
          <div className="sm:w-[40%] w-[29%] h-[50px]  rounded-[36px] shadow-lg  flex justify-center items-center cursor-pointer">
            <div
              className="flex w-[50%] items-center  justify-center "
              onClick={() => {
                isCompanyActive ? handleDeleteModal() : handlesubscribeModal();
              }}
            >
              <p className="font-[500]  sm:text-[14px] text-[10px] whitespace-nowrap ml-2 gap-5">
                {t("Pro Version")} {"\u00A0"}
              </p>
              <div>
                <FormControlLabel
                  control={
                    <IOSSwitch sx={{ ml: 2 }} checked={isCompanyActive} />
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="sm:w-[40%] w-[29%] h-[50px]  rounded-[36px] shadow-lg  flex justify-center items-center cursor-pointer"
            onClick={() => handleModal()}
          >
            <p className="font-[500] sm:text-[15px] text-[8px] text-center">
              {t("Add Links & Contacts")}
            </p>
          </div>
        )}
      </div>

      <div className="w-[100%] mt-5">
        <div className="sm:w-[60%] w-[100%] h-[35px]  rounded-[36px] flex  items-center bg-[#F2F2F2] mt-2">
          <div className="w-[22%] h-[100%] font-[500] text-[11px] flex justify-center items-center text-center leading-3 pl-1">
            {t("Icons Color")}
          </div>

          <div className="w-[78%] h-[100%] flex justify-evenly items-center">
            <div className="h-[18px] w-[18px] rounded-full bg-black flex justify-center items-center">
              <label
                htmlFor="bgclr"
                className="h-[100%] w-[100%] rounded-full flex justify-center items-center"
              >
                <div>
                  <MdColorize className="text-[white] text-[14px] cursor-pointer" />
                </div>
                <input
                  type="color"
                  id="bgclr"
                  style={{
                    opacity: "0px",
                    height: "0px",
                    width: "0px",
                    // backgroundColor: "black",
                    // color: "black",
                  }}
                  onChange={(e) => dispatch(setColor(e.target.value))}
                  value={color}
                />
              </label>
            </div>
            <div
              style={{
                border: color === "#E70A0A" ? "1px solid #E70A0A" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#E70A0A] cursor-pointer"
                onClick={() => dispatch(setColor("#E70A0A"))}
              ></div>
            </div>
            <div
              style={{
                border: color === "#0ED416" ? "1px solid #0ED416" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#0ED416] cursor-pointer"
                onClick={() => dispatch(setColor("#0ED416"))}
              ></div>
            </div>
            <div
              style={{
                border: color === "#3076FF" ? "1px solid #3076FF" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#3076FF] cursor-pointer"
                onClick={() => dispatch(setColor("#3076FF"))}
              ></div>
            </div>
            <div
              style={{
                border: color === "#F439D6" ? "1px solid #F439D6" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#F439D6] cursor-pointer"
                onClick={() => dispatch(setColor("#F439D6"))}
              ></div>
            </div>
            <div
              style={{
                border: color === "#6732FF" ? "1px solid #6732FF" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#6732FF] cursor-pointer"
                onClick={() => dispatch(setColor("#6732FF"))}
              ></div>
            </div>
            <div
              style={{
                border: color === "#FCE410" ? "1px solid #FCE410" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#FCE410] cursor-pointer"
                onClick={() => dispatch(setColor("#FCE410"))}
              ></div>
            </div>
            <div
              style={{
                border: color === "#1BE4FF" ? "1px solid #1BE4FF" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#1BE4FF] cursor-pointer"
                onClick={() => dispatch(setColor("#1BE4FF"))}
              ></div>
            </div>
            <div
              style={{
                border: color === "#DEA527" ? "1px solid #DEA527" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#DEA527] cursor-pointer"
                onClick={() => dispatch(setColor("#DEA527"))}
              ></div>
            </div>
          </div>
        </div>
        

        <div className="sm:w-[60%] w-[100%] h-[35px]  rounded-[36px] flex  items-center bg-[#F2F2F2] mt-2">
          <div className="w-[22%] h-[100%] font-[500] text-[11px] flex justify-center items-center text-center leading-3 pl-1">
            {t("Text Color")}
          </div>

          <div className="w-[78%] h-[100%] flex justify-evenly items-center ">
            <div className="h-[18px] w-[18px] rounded-full bg-black flex justify-center items-center">
              <label
                htmlFor="textclr"
                className="h-[100%] w-[100%] rounded-full flex justify-center items-center"
              >
                <div>
                  <MdColorize className="text-[white] text-[14px] cursor-pointer" />
                </div>
                <input
                  type="color"
                  id="textclr"
                  style={{
                    opacity: "0px",
                    height: "0px",
                    width: "0px",
                    // backgroundColor: "black",
                    // color: "black",
                  }}
                  onChange={(e) => dispatch(setTextColor(e.target.value))}
                  value={textColor}
                />
              </label>
            </div>
            <div
              style={{
                border: textColor === "#E70A0A" ? "1px solid #E70A0A" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#E70A0A] cursor-pointer"
                onClick={() => dispatch(setTextColor("#E70A0A"))}
              ></div>
            </div>
            <div
              style={{
                border: textColor === "#0ED416" ? "1px solid #0ED416" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#0ED416] cursor-pointer"
                onClick={() => dispatch(setTextColor("#0ED416"))}
              ></div>
            </div>
            <div
              style={{
                border: textColor === "#3076FF" ? "1px solid #3076FF" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#3076FF] cursor-pointer"
                onClick={() => dispatch(setTextColor("#3076FF"))}
              ></div>
            </div>
            <div
              style={{
                border: textColor === "#F439D6" ? "1px solid #F439D6" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#F439D6] cursor-pointer"
                onClick={() => dispatch(setTextColor("#F439D6"))}
              ></div>
            </div>
            <div
              style={{
                border: textColor === "#6732FF" ? "1px solid #6732FF" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#6732FF] cursor-pointer"
                onClick={() => dispatch(setTextColor("#6732FF"))}
              ></div>
            </div>
            <div
              style={{
                border: textColor === "#FCE410" ? "1px solid #FCE410" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#FCE410] cursor-pointer"
                onClick={() => dispatch(setTextColor("#FCE410"))}
              ></div>
            </div>
            <div
              style={{
                border: textColor === "#1BE4FF" ? "1px solid #1BE4FF" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#1BE4FF] cursor-pointer"
                onClick={() => dispatch(setTextColor("#1BE4FF"))}
              ></div>
            </div>
            <div
              style={{
                border: textColor === "#DEA527" ? "1px solid #DEA527" : null,
                height: "18px",
                width: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
              }}
            >
              <div
                className="h-[14px] w-[14px] rounded-full bg-[#DEA527] cursor-pointer"
                onClick={() => dispatch(setTextColor("#DEA527"))}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex w-[30%] mt-2 items-center  justify-around ">
              <p className="font-[500]  sm:text-[14px] text-[10px] whitespace-nowrap ml-2">
                {t("Dark Mode")} {"\u00A0"}
              </p>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={darkTheme}
                    onChange={handleDarkModeChange}
                  />
                }
              />
          </div>
      </div>

      <div className="w-[100%] mt-4">
        <div className="w-[100%] flex cursor-pointer">
          <div className=" flex flex-col whitespace-nowrap  items-center sm:text-[13px] text-[8px]">
            <span className="flex justify-center items-center mb-1  ">
              {t("Logo")} {"\u00A0"}
              <RiErrorWarningLine />
            </span>
            {logo || organizationLogo ? (
              <div className="sm:w-[120px] sm:h-[120px] w-[70px] h-[70px] border flex justify-center items-center flex-col relative">
                <FiMinusCircle
                  style={{ fontSize: "25px" }}
                  className="absolute right-[0px] top-0 text-red-500"
                  onClick={() => {
                    dispatch(setLogoUrl("")), dispatch(setOrgLogo(""));
                  }}
                />
                {!companyProfile?.logoLock ? (
                <img
                  src={organizationLogo ? organizationLogo : logo ? appendBucketPath(logo) : lgoplhldr}
                  alt=""
                  className="max-h-[100%] max-w-[100%] "
                /> ) : (
                  <img
                  src={logo ? appendBucketPath(logo) : organizationLogo}
                  alt=""
                  className="max-h-[100%] max-w-[100%] "
                /> 
                )}
              </div>
            ) : (
              <div className="sm:w-[120px] sm:h-[120px] m-w-[70px] m-h-[70px] border  bg-gray-100 flex justify-center items-center flex-col relative">
                <label
                  htmlFor="logoImg"
                  className="absolute right-[0px] top-0"
                >
                  <GrAddCircle style={{ fontSize: "20px" }} />

                  <input
                    type="file"
                    accept="image/*"
                    id="logoImg"
                    style={{ opacity: 0, width: "0px", height: "0px" }}
                    onChange={handleLogoImageChange}
                    key={logoKey}
                  />
                </label>
                <BiImage
                  className="sm:text-[30px] text-[20px]"
                  style={{ color: "8F8E8E" }}
                />
              </div>
            )}
          </div>
          {"\u00A0"}
          <div className=" flex flex-col whitespace-nowrap  items-center sm:text-[13px] text-[8px] ml-[9%] ">
            <span className="flex justify-center items-center mb-1 ">
              {t("Profile Picture")} {"\u00A0"}
              <RiErrorWarningLine />
            </span>

            {profile || organizationProfile ? (
              <div className="sm:w-[120px] sm:h-[120px] w-[70px] h-[70px] border  flex justify-center items-center flex-col relative">
                <FiMinusCircle
                  style={{ fontSize: "25px" }}
                  className="absolute right-[0px] top-0 text-red-500"
                  onClick={() => {
                    dispatch(setProfileurl("")),
                      dispatch(setOrganizationProfile(""));
                  }}
                />
                {!companyProfile?.profilePictureLock ? (
                <img
                  src={organizationProfile ? organizationProfile : profile ? appendBucketPath(profile) :  bgplhldr}
                  alt=""
                  className="h-[100%] w-[100%] object-cover"
                /> ) : (
                  <img
                  src={profile ? appendBucketPath(profile) : organizationProfile ? organizationProfile : bgplhldr}
                  alt=""
                  className="h-[100%] w-[100%] object-cover"
                />
                )}
              </div>
            ) : (
              <div className="sm:w-[120px] sm:h-[120px] w-[70px] h-[70px] border bg-gray-100 flex justify-center items-center flex-col relative">
                <label
                  htmlFor="prflImg"
                  className="absolute right-[0px] top-0"
                >
                  <GrAddCircle style={{ fontSize: "20px" }} />

                  <input
                    type="file"
                    accept="image/*"
                    id="prflImg"
                    style={{ opacity: 0, width: "0px", height: "0px" }}
                    onChange={handlePrflImageChange}
                    key={prflKey}
                  />
                </label>
                <PiUserRectangleFill
                  className="sm:text-[30px] text-[20px]"
                  style={{ color: "8F8E8E" }}
                />
              </div>
            )}
          </div>
          {"\u00A0"}
          <div className=" flex flex-col whitespace-nowrap  items-center sm:text-[13px] text-[8px] ml-[9%]">
            <span className="flex justify-center items-center mb-1 ">
              {t("Cover Picture")} {"\u00A0"}
              <RiErrorWarningLine />
            </span>
            {cover || organizationCover ? (
              <div className="sm:w-[253px] w-[166px] sm:h-[120px] h-[65px] rounded-[36px]  bg-gray-100 flex justify-center items-center flex-col relative">
                <FiMinusCircle
                  style={{ fontSize: "25px" }}
                  className="absolute right-[0px] top-[-3px] text-red-500"
                  onClick={() => {
                    dispatch(setCoverUrl("")),
                      dispatch(setOrganizationCover(""));
                  }}
                />
                 {!companyProfile?.coverLock ? (
                <img
                  src={organizationCover ? organizationCover : cover ? appendBucketPath(cover) : bgplhldr}
                  alt=""
                  className="h-[100%] w-[100%] object-cover rounded-[36px]"
                /> )
                : (
                  <img
                  src={cover ? appendBucketPath(cover) : organizationCover}
                  alt=""
                  className="h-[100%] w-[100%] object-cover rounded-[36px]"
                /> 
                )}
              </div>
            ) : (
              <div className="sm:w-[253px] w-[166px] sm:h-[150px] h-[65px] rounded-[36px]  bg-gray-100 flex justify-center items-center flex-col relative">
                <label htmlFor="cvrImg" className="absolute right-[3px] top-0">
                  <GrAddCircle style={{ fontSize: "20px" }} />

                  <input
                    type="file"
                    accept="image/*"
                    id="cvrImg"
                    style={{ opacity: 0, width: "0px", height: "0px" }}
                    onChange={handlebgImageChange}
                    key={coverKey}
                  />
                </label>
                <IoImageOutline
                  className="sm:text-[30px] text-[20px]"
                  style={{ color: "8F8E8E" }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-[100%] mt-5">
          <div className="w-[100%] flex justify-between ">
            <input
              type="text"
              className="w-[48%] h-[38px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
              placeholder={t("Name")}
              onChange={(e) => dispatch(setName(e.target.value))}
              value={name}
            />

            <input
              type="text"
              className="w-[48%] h-[38px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
              placeholder={t("Email")}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              value={email}
            />
          </div>
        </div>

        <div className="w-[100%] mt-3">
          <div className="w-[100%] flex justify-between ">
            <input
              type="text"
              className="w-[48%] h-[38px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
              placeholder={t("Job Title")}
              onChange={(e) => dispatch(setDesignation(e.target.value))}
              value={designation}
            />

            <input
              type="text"
              className="w-[48%] h-[38px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
              placeholder={t("Phone Number")}
              onChange={(e) => dispatch(setPhone(e.target.value))}
              value={phone}
            />
          </div>
        </div>
        <div className="w-[100%] mt-5">
          <div className="w-[100%] flex justify-between ">
            <input
              type="text"
              className="w-[100%] h-[38px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
              placeholder={t("Address")}
              onChange={(e) => dispatch(setAddress(e.target.value))}
              value={address}
            />
          </div>
        </div>
        <div className="w-[100%] mt-3">
          <textarea
            name=""
            id=""
            className="w-[100%] h-[60px] rounded-[22px] bg-[#F2F2F2] outline-none resize-none pl-2 pt-2"
            onChange={(e) => dispatch(setBio(e.target.value))}
            value={bio}
            placeholder={t("Bio")}
          ></textarea>
          <br /><br /><br />
        </div>

        <div className=" flex justify-end absolute bottom-[3px] right-[24px] bg-white w-[93%] p-[10px_0px] rounded-[10px]">
          <div
            className="w-[252px] flex justify-between mt-1 "
            style={screen <= 450 ? { marginTop: "20px" } : null}
          >
            <button
              className="w-[120px] h-[40px] border rounded-[16px] text-[12px] font-[600]"
              onClick={() => handleCancelAbout()}
            >
              {t("Cancel")}
            </button>
            <button
              className="w-[120px] h-[40px] border rounded-[16px] bg-[#000000] text-[12px] font-[600] text-white"
              onClick={() => {
                handleSaveModal()
              }}
            >
              {t("Update")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
