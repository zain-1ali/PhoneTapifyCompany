import React, { useEffect, useMemo, useState } from "react";
import bgplhldr from "../imgs/bgplhldr.png";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import lgoplchldr from "../imgs/lgoplchldr.jpg";
import { useSelector } from "react-redux";
import { returnIcons } from "../assets/ReturnSocialIcons";
import { getSingleChild, splitString } from "../Services";
import {
  setOrgLogo,
  setOrganizationCover,
  setOrganizationProfile,
} from "../redux/profileInfoSlice";
import { BsGlobe2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Mobile = ({
  linkInfo,
  ifAdded,
  photoValue,
  checkPhotoAdded,
  customPhoto,
  videoValue,
  checkAddedVideo,
  customVideo,
}) => {
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
  const links = useSelector((state) => state.profileInfoSlice.links);
  const formHeader = useSelector((state) => state.profileInfoSlice.formHeader) ?? "Join Network";

  const nameVisible = useSelector(
    (state) => state.profileInfoSlice.nameVisible
  ) ?? true;
  const emailVisible = useSelector(
    (state) => state.profileInfoSlice.emailVisible
  ) ?? true;
  const companyVisible = useSelector(
    (state) => state.profileInfoSlice.companyVisible
  ) ?? true;
  const jobVisible = useSelector((state) => state.profileInfoSlice.jobVisible) ?? true;
  const noteVisible = useSelector(
    (state) => state.profileInfoSlice.noteVisible
  ) ?? true;
  const phoneVisible = useSelector(
    (state) => state.profileInfoSlice.phoneVisible
  ) ?? true;

  const leadMode = useSelector((state) => state.profileInfoSlice.leadMode);
  let darkTheme = useSelector((state) => state.profileInfoSlice.darkTheme);
  darkTheme = (darkTheme == "0" || darkTheme == 0 || darkTheme == false) ? false : true;
  const designation = useSelector(
    (state) => state.profileInfoSlice.designation
  );
  // const email = useSelector((state) => state.profileInfoSlice.email);
  // const color = useSelector((state) => state.profileInfoSlice.color);

  // -----------------------------------------hex to rgba for bg color-------------------------------------

  let hexToRGBA = (hex) => {
    // Remove the '#' character if present
    hex = hex?.replace("#", "");

    // Convert the hex value to RGB
    const red = parseInt(hex?.substring(0, 2), 16);
    const green = parseInt(hex?.substring(2, 4), 16);
    const blue = parseInt(hex?.substring(4, 6), 16);

    // Convert RGB to RGBA with alpha value 0.1
    const rgba = `rgba(${red}, ${green}, ${blue}, 0.1)`;

    return rgba;
  };

  const nameLock = useSelector((state) => state.profileInfoSlice.nameLock);
  const phoneLock = useSelector((state) => state.profileInfoSlice.phoneLock);
  const locationLock = useSelector(
    (state) => state.profileInfoSlice.locationLock
  );
  const bioLock = useSelector((state) => state.profileInfoSlice.bioLock);

  const profilePictureLock = useSelector(
    (state) => state.profileInfoSlice.profilePictureLock
  );
  const logoLock = useSelector((state) => state.profileInfoSlice.logoLock);
  const coverLock = useSelector((state) => state.profileInfoSlice.coverLock);
  const organizationProfile = useSelector(
    (state) => state.profileInfoSlice.organizationProfile
  );
  const organizationLogo = useSelector(
    (state) => state.profileInfoSlice.organizationLogo
  );
  const organizationCover = useSelector(
    (state) => state.profileInfoSlice.organizationCover
  );
  const featuredImages = useSelector(
    (state) => state.profileInfoSlice.featuredImages
  );

  const featuredVideos = useSelector(
    (state) => state.profileInfoSlice.featuredVideos
  );

  // console.log(featuredImages);
  const appendBucketPath = (path) => {
    if (path.startsWith("gs://")) {
      const filterUrl = path.replace("gs://phonetapify-c6c06.appspot.com/", "");
      return `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${encodeURIComponent(filterUrl)}?alt=media`;
    } 
    return path; // Return the same path if it doesn't start with "gs://"
  };

  let [companyId, setCompanyId] = useState("");
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");
  let [companyProfile, setCompanyProfile] = useState({});
  let [bioHidden, setBioHidden] = useState(true);
  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);
  let dispatch = useDispatch();
  let getCompanyData = (data) => {
    dispatch(setOrganizationCover(data?.[companyId]?.coverUrl));
    dispatch(setOrgLogo(data?.[companyId]?.logoUrl));
    dispatch(setOrganizationProfile(data?.[companyId]?.profileUrl));
    setCompanyProfile(data?.[companyId]);
  };

  useEffect(() => {
    getSingleChild(companyId, getCompanyData);
  }, [companyId]);

  // console.log(companyProfile);

  let returnWeblink = () => {
    let web = links?.find((elm) => {
      return elm?.linkID === 54;
    });

    return web;
  };


  // csonsole.log(textColor);

  const { t } = useTranslation();

  const OrReturner = (val1, val2) => {
    return val1 || val2;
  };

  const VideoComponent = ({ customVideo }) => {
    return (
      <video
        src={
          typeof customVideo === "object" && URL.createObjectURL(customVideo)
        }
        controls
        className="h-[100%] w-[100%] rounded-xl"
      />
    );
  };
  const buttonColor = color ? color : companyProfile?.color;
  const memoizedVideo = useMemo(() => {
    return customVideo ? <VideoComponent customVideo={customVideo} /> : null;
  }, [customVideo]);

  return (
    <div
      className="w-[253px] h-[455px] border mt-2 overflow-y-scroll relative shadow-lg"
      style={{ backgroundColor: darkTheme ? "black" : "#F5F6FA" }}
    >
      {leadMode && (
        <div className="absolute w-[100%] flex justify-center items-center h-[455px]">
          <div className="h-[380px] w-[85%] border z-20 rounded-md flex justify-center items-center"
            style={{ backgroundColor: darkTheme ? "black" : "white" }}>
            <div className="h-[90%] w-[85%] ">
              <div className="w-[100%] border-b border-black mt-[2px] flex justify-center text-[13px]">
                {formHeader}
              </div>
              {nameVisible && (
                <div
                  className={`mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border ${darkTheme ? 'border-gray text-gray-100' : 'border-black text-black'
                    } rounded-lg flex items-center`}
                >
                  {t("Name")}
                </div>
              )}
              {emailVisible && (
                <div
                  className={`mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border ${darkTheme ? 'border-gray text-gray-100' : 'border-black text-black'
                    } rounded-lg flex items-center`}
                >
                  {t("Email")}
                </div>
              )}
              {phoneVisible && (
                <div
                  className={`mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border ${darkTheme ? 'border-gray text-gray-100' : 'border-black text-black'
                    } rounded-lg flex items-center`}
                >
                  {t("Phone")}
                </div>
              )}
              {companyVisible && (
                <div
                  className={`mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border ${darkTheme ? 'border-gray text-gray-100' : 'border-black text-black'
                    } rounded-lg flex items-center`}
                >
                  {t("Company")}
                </div>
              )}

              {jobVisible && (
                <div
                  className={`mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border ${darkTheme ? 'border-gray text-gray-100' : 'border-black text-black'
                    } rounded-lg flex items-center`}
                >
                  {t("Job")}
                </div>
              )}
              {noteVisible && (
                <div
                  className={`mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border ${darkTheme ? 'border-gray text-gray-100' : 'border-black text-black'
                    } rounded-lg flex items-center`}
                >
                  {t("Note")}
                </div>
              )}
              <div className="w-[100%] flex justify-center items-center mt-2">
                <div className={`w-[70px] h-[30px] border rounded-full flex justify-center items-center text-xs mr-1 ${darkTheme ? 'border-gray text-gray-100' : 'border-black text-black'
                  } `}>
                  {t("Cancel")}
                </div>
                <div
                  className="w-[70px] h-[30px] border rounded-full flex justify-center items-center text-white text-xs ml-1"
                  style={{ backgroundColor: color ? color : "black" }}
                >
                  {t("Submit")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-[100%] h-[200px] relative">
        {!profilePictureLock ? (
          <img
            src={
              profile ? appendBucketPath(profile) : organizationProfile ? organizationProfile : bgplhldr
            }
            alt=""
            className="w-[100%] h-[200px] object-cover"
          />
        ) : (
          <img
            src={bgplhldr}
            alt=""
            className="w-[100%] h-[200px] object-cover"
          />
        )}



      </div>
      <div className="flex w-full justify-center -mt-[75px]">
        <div className="flex flex-col items-center h-auto min-h-[100px] w-[210px] relative shadow-lg rounded-[4px] pb-[17px]"
          style={{ backgroundColor: darkTheme ? "#16171B" : "white" }}
        >


          {!logoLock ? (
            <img
              className="max-w-[100px] max-h-[55px] z-[1] object-cover mt-2"
              alt=""
              src={logo ? appendBucketPath(logo) : organizationLogo ? organizationLogo : lgoplchldr}
            />
          ) : (
            <img
              src={lgoplchldr}
              alt=""
              className="max-w-[100px] max-h-[55px] z-[1] object-cover mt-2"
            />
          )}
          {!nameLock && (
            <h2 className="max-h-[60px] overflow-hidden max-w-[90%] break-word text-center font-bold mt-[5px] mb-0 text-[14px]"
              style={{
                color: textColor ? textColor : "#000000",
              }}>

              {name ? splitString(name, 36) : companyProfile?.name}
            </h2>
          )}

          <p className="max-w-[90%] break-word overflow-hidden mt-0 max-h-[48px] text-[12px] font-medium mb-0 text-center"
            style={{
              color: textColor ? textColor : "#000000",
            }}
          >
            {designation}
          </p>
          <p className="max-w-[90%] break-word overflow-hidden mt-0 max-h-[48px] text-[12px] font-medium mb-0 text-center"
            style={{
              color: textColor ? textColor : "#000000",
            }}
          >
            {companyProfile?.name}
          </p>

          <div className="w-[70%] p-[5px_4px] rounded-[14px] bg-[#F4F4F4] flex flex-col items-center mt-[15px]"
            style={{ backgroundColor: darkTheme ? "black" : "#F4F4F4" }}
          >
            <div className="flex w-[94%] justify-between items-center">
              <p className="m-0 text-[13px]"
                style={{
                  color: textColor ? textColor : "#000000",
                }}
              >About Me</p>
              <p id="plus_sign"
                className={`cursor-pointer ${bioHidden ? '' : 'hidden'}`}
                onClick={() => setBioHidden(false)}
                style={{
                  color: textColor ? textColor : "#000000",
                }}

              >+</p>
              <p id="minus_sign"
                className={`cursor-pointer ${bioHidden ? 'hidden' : ''}`}
                onClick={() => setBioHidden(true)}
                style={{
                  color: textColor ? textColor : "#000000",
                }}
              >-</p>
            </div>
            {!bioLock && (
              <p id="about_text" className={`w-[95%] break-word overflow-hidden mt-[10px] text-[#959595] text-[12px] mb-[1px] ${bioHidden ? 'hidden' : ''}`}>
                {bio ? bio : companyProfile?.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-[100%] flex flex-col items-center mt-3">
        <div className="w-[90%] grid grid-cols-4 ml-6 gap-y-3">
          {links?.map((elm) => {
            return linkInfo?.linkID != elm?.linkID ? (
              <div
                className="w-[35px] h-[50px] flex flex-col items-center"
                style={{
                  display:
                    !elm?.shareable || elm?.linkID === 54 ? "none" : null,
                }}
              >
                <img
                  src={returnIcons(elm?.linkID)}
                  alt=""
                  className="h-[35px] w-[35px]"
                  style={{ borderRadius: elm?.image ? "8px" : "0px" }}
                />
                <p
                  className="text-[8px] mt-[2px] text-center"
                  style={{
                    color: textColor ? textColor : "#000000",
                  }}
                >
                  {splitString(elm?.name, 15)}
                </p>
              </div>
            ) : (
              <div className="w-[35px] h-[50px] flex flex-col items-center ">
                <img
                  src={
                    returnIcons(linkInfo?.linkID)
                  }
                  alt=""
                  className=" rounded-lg object-cover min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px]"
                />
                <p
                  className="text-[8px] mt-[2px] text-center"
                  style={{
                    color: textColor ? textColor : "#000000",
                  }}
                >
                  {splitString(linkInfo?.name, 15)}
                </p>
              </div>
            );
          })}

          {ifAdded === false && linkInfo?.name && (
            <div className="w-[35px] h-[50px] flex flex-col items-center ">
              <img
                src={
                  linkInfo?.image
                    ? linkInfo?.image
                    : returnIcons(linkInfo?.linkID)
                }
                alt=""
                className="min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] rounded-lg object-cover"
              />
              <p
                className="text-[8px] mt-[2px] text-center"
                style={{
                  color: textColor ? textColor : "#000000",
                }}
              >
                {splitString(linkInfo?.name, 15)}
              </p>
            </div>
          )}
        </div>
      </div>


      <div className="w-full sticky bottom-0 flex justify-between max-w-[420px]  p-[0px_2%_10px_2%]"
        style={{ backgroundColor: darkTheme ? "black" : "#F5F6FA" }}
      >
        <div method="get" className="w-[48%] flex justify-center">
          <button
            className="w-full h-[33px] mt-[10px] text-[11px] text-white rounded-[6px] flex justify-center items-center"
            style={{ backgroundColor: buttonColor }}
          >
            Save Contact
          </button>
        </div>

        <a
          className="w-[48%] h-[33px] mt-[10px] text-[11px] border-[1px] rounded-[6px] flex justify-center items-center"
          style={{
            borderColor: buttonColor,
            color: buttonColor,
          }}>
          Exchange Contact
        </a>
      </div>

    </div>
  );
};

export default Mobile;
