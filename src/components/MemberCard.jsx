import React, { useState, useEffect } from "react";
import bg from "../imgs/bg.jpg";
// import prfl from "../imgs/nlogo.jpeg";
import primg from "../imgs/nlogo.jpg";
import { FaBriefcase } from "react-icons/fa6";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoMdPricetags } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
import { TbLogin } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import bgplhldr from "../imgs/bgplhldr.png";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import lgoplchldr from "../imgs/lgoplchldr.jpg";
import { changeProfileStatus, deleteSingleChild, updateCompanyToken, FetchProfileTag, loginAsTeam } from "../Services";

import ShareCardModal from "./Modals/ShareCardModal";
import DeleteModal from "./Modals/DeleteModal";
import SelectEditType from "./Modals/SelectEditType";
import { useTranslation } from "react-i18next";


const MemberCard = ({ profile, companyProfile, updateChildList }) => {
  let navigate = useNavigate();
  var screen = window.innerWidth;
  let [shareModal, setshareModal] = useState(false);
  let [userId, setuserId] = useState("");
  const [teams, setTeams] = useState(null);
  const [profileTag, setProfileTag] = useState(null);

  let getProfileTag = (obj) => {
    if (obj) {
      setProfileTag(Object.values(obj)[0]);
    }
  };

  useEffect(() => {
    FetchProfileTag(profile?.id, getProfileTag);
  }, []);

  let handleShareModal = () => {
    setshareModal(!shareModal);
  };



  let [deleteModal, setdeleteModal] = useState(false);
  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  let [editModal, seteditModal] = useState(false);
  let [editTypeModal, setEditTypeModal] = useState(false);

  let handleeditModal = () => {
    if (conexParent === "superAdmin") {
      navigate(`/edit/${profile?.id}`);
    } else {
      setEditTypeModal(!editTypeModal);
    }
  };
  let handledEditType = (action) => {
    if (action === "cancel") {
      setEditTypeModal(!editTypeModal);
    } else if (conexParent === "superAdmin") {
      () => navigate(`/edit/${profile?.id}`);
    } else {
      if (action === "Digital Card") {
        navigate(`/edit/${profile?.id}`);
      } else {
        updateCompanyToken(companyProfile?.id, profile?.id);
      }
    }
  };
  let callback = () => {
    updateChildList();
  };

  const appendBucketPath = (path) => {
    if (path.startsWith("gs://")) {
      const filterUrl = path.replace("gs://phonetapify-c6c06.appspot.com/", "");
      return `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${encodeURIComponent(filterUrl)}?alt=media`;
    } 
    return path; // Return the same path if it doesn't start with "gs://"
  };
  
  let conexParent = localStorage.getItem("conexParent");
  const { t } = useTranslation();
  return (
    <div className={`sm:w-[265px] w-[100%] ${conexParent == "superAdmin" ? "sm:h-[345px]" : "sm:h-[300px]"} h-[300px]  rounded-3xl mt-[20px] bg-[white]`}>
      <ShareCardModal
        shareModal={shareModal}
        handleShareModal={handleShareModal}
        profileTag={profileTag?.tagId ?? userId}
      />
      <DeleteModal
        deleteModal={deleteModal}
        handledeleteModal={handledeleteModal}
        text={t("Are you sure to delete this profile?")}
        func={() => deleteSingleChild(userId, teams, callback)}
      />
      <SelectEditType
        editTypeModal={editTypeModal}
        text={t("Select tag you want to edit")}
        handledEditType={handledEditType}
        tags={profile?.otherTags}
      />

      <DeleteModal
        deleteModal={editModal}
        handledeleteModal={seteditModal}
        text={t("Are you sure to edit this profile?")}
        func={
          conexParent === "superAdmin" ? () => navigate(`/edit/${profile?.id}`)
            : () => updateCompanyToken(companyProfile?.id, profile?.id)
        }
      />

      <div className="rounded-t-3xl h-[154px]  w-[100%] relative ">
        
        <img
                        
          src={!companyProfile?.logoLock ? (

            companyProfile?.logoUrl
                ? companyProfile?.logoUrl
                : appendBucketPath(profile?.logoUrl)
              ? appendBucketPath(profile?.logoUrl)
              : lgoplchldr
          ) : (
            appendBucketPath(profile?.logoUrl)
            ? appendBucketPath(profile?.logoUrl)
            : companyProfile?.logoUrl
              ? companyProfile?.logoUrl
              : lgoplchldr
          )}
          alt="prfl"
          className="h-[42px] w-[42px] rounded-full absolute bottom-[10px] left-[18px]  object-cover "
          style={{ zIndex: "1" }}
        />
        <div className="h-[85px] w-[85px] absolute bottom-[0px] left-[90px]">
          <div className="h-[85px] w-[85px] relative">
            <img
              src={
                !companyProfile?.profilePictureLock ? (
                  companyProfile?.profileUrl
                  ? companyProfile?.profileUrl
                  : appendBucketPath(profile?.profileUrl)
                    ? appendBucketPath(profile?.profileUrl)
                    : prsnPlshldr
                ) : (
                  appendBucketPath(profile?.profileUrl)
                  ? appendBucketPath(profile?.profileUrl)
                  : companyProfile?.profileUrl
                    ? companyProfile?.profileUrl
                    : prsnPlshldr
                )
              }
              alt="prfl"
              className="h-[85px] w-[85px] rounded-full object-cover"
            />
          </div>
        </div>
        <img
          src={!companyProfile?.coverLock ? (            
            companyProfile?.coverUrl
                ? companyProfile?.coverUrl
                : appendBucketPath(profile?.coverUrl)
              ? appendBucketPath(profile?.coverUrl)
              : bgplhldr
          ) : (
            appendBucketPath(profile?.coverUrl)
              ? appendBucketPath(profile?.coverUrl)
              : companyProfile?.coverUrl
                ? companyProfile?.coverUrl
                : bgplhldr
          )
          }
          alt="bg"
          className="h-[124px] w-[100%] object-cover rounded-t-3xl"
        />
      </div>

      <div className="w-[100%] flex justify-center   mt-3">
        <div className="w-[90%] flex justify-between">
          <div className={` ${conexParent == "superAdmin" ? "h-[170px]" : "h-[120px]"} w-[48%]  rounded-[7px] bg-[#FBFBFB] flex justify-center items-center`}>
            <div className="h-[85%] w-[86%]">
              <h2 className="font-[500] text-[12px] line-clamp-2 w-[99%]">
                {profile?.name}
              </h2>
              <div className="flex mt-1">
                <FaBriefcase className="text-xs text-black" />
                <p
                  className="font-[500] sm:text-[9px] text-[11px] ml-[4px] text-[#3D3C3C]"
                  style={screen <= 450 ? { marginTop: "-1px" } : null}
                >
                  {profile?.job}
                </p>
              </div>
              <div className="flex mt-[5px]">
                <div className="w-[15%]">
                  <BsFillInfoSquareFill className="text-xs text-black" />
                </div>

                <div
                  className="font-[500] sm:text-[9px] text-[10px] sm:ml-[4px] ml-[0px] text-[#3D3C3C] w-[100%] overflow-hidden"
                  style={screen <= 450 ? { marginTop: "-2px" } : null}
                >
                  <div className="line-clamp-3">{profile?.bio}</div>
                </div>
              </div>
              <div className="flex mt-[5px]">
                <div className="w-[15%]">
                  <IoMdPricetags className="text-xs text-black" />
                </div>

                <div
                  className="font-[500] sm:text-[9px] text-[10px] sm:ml-[4px] ml-[0px] text-[#3D3C3C] w-[100%] overflow-hidden"
                  style={screen <= 450 ? { marginTop: "-2px" } : null}
                >
                  <div className="line-clamp-2">
                    {profile?.otherTags?.map((tag, index) => (
                      <span key={index}>
                        {tag ?? ""}{index < profile.otherTags.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className={` ${conexParent == "superAdmin" ? "h-[170px]" : "h-[120px]"}  w-[48%]  flex justify-center items-center`}>
            <div className="h-[100%] w-[90%] flex flex-col justify-between">
              <div className="w-[100%] flex justify-between">
                <div
                  className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                  onClick={() =>
                    changeProfileStatus(profile?.profileOn, profile?.id)
                  }
                >
                  {profile?.profileOn === 0 ? (
                    <CiLock className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                  ) : (
                    <CiUnlock className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                  )}

                  <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                    {profile?.profileOn === 0 ? t("Lock") : t("Unlock")}
                  </p>
                </div>

                {conexParent != "superAdmin2" ? (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={(profile?.otherTags?.length == 1 && profile?.otherTags?.includes("Digital Card")) ? () => handledEditType("Digital Card") : handleeditModal}
                  >
                    <FiEdit className="text-[#3D3C3C] sm:text-[14px] text-[17px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C] mt-1">
                      {t("Edit")}
                    </p>
                  </div>
                ) : (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      handleShareModal(), setuserId(profile?.id);
                    }}
                  >
                    <FiShare2 className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Share")}
                    </p>
                  </div>
                )}
              </div>

              <div className="w-[100%] flex justify-between">
                {conexParent != "superAdmin2" ? (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      handleShareModal(), setuserId(profile?.id);
                    }}
                  >
                    <FiShare2 className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Share")}
                    </p>
                  </div>
                ) : (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      handledeleteModal(),
                        setuserId(profile?.id),
                        setTeams(profile?.teams);
                    }}
                  >
                    <IoTrashOutline className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Delete")}
                    </p>
                  </div>
                )}

                {conexParent != "superAdmin2" && (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      handledeleteModal(),
                        setuserId(profile?.id),
                        setTeams(profile?.teams);
                    }}
                  >
                    <IoTrashOutline className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Delete")}
                    </p>
                  </div>
                )}
              </div>
              {conexParent == "superAdmin" && (
              <div className="w-[100%] flex justify-between">
                  <div
                    className="h-[53px] w-[100%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => 
                      loginAsTeam(profile?.id, navigate)
                    }
                  >
                    
                    <TbLogin className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Login As Admin")}
                    </p>
                  </div>
              </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
