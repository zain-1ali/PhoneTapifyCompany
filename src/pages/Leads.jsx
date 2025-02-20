import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { BiSearchAlt } from "react-icons/bi";
import { MdArrowDropDown, MdOutlineFilterList } from "react-icons/md";
import { Checkbox, Menu, Tooltip } from "@mui/material";
import { FaEye, FaSquarePlus } from "react-icons/fa6";
import csv from "../imgs/csv.png";
import zap from "../imgs/zap.png";
import { TfiDownload } from "react-icons/tfi";
import { FaRegTrashCan } from "react-icons/fa6";
import NavbarFooter from "./NavbarFooter";
import CreateNewTeam from "../components/Modals/CreateNewTeam";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getAllChilds, getAllTeams, getContacts } from "../Services";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import SingleLeadModal from "../components/Modals/SingleLeadModal";
// import DeleteContact from "../components/Modals/DeleteContactModal";
import DeleteContactModal from "../components/Modals/DeleteContactModal";
import DownloadCsv from "../components/DownloadCsv";
import { useTranslation } from "react-i18next";
import { combineSlices } from "@reduxjs/toolkit";

const Leads = ({search, userId, teamId, allProfiles, startDate, endDate, resetFilterVal, filteredDataCallback, spaceUsed, setSpaceUsed}) => {
  let [leads, setLeads] = useState([]);
  var screen = window.innerWidth;
  const { t } = useTranslation();

  let calculateSpace = () => {
    let space = 0;
    leads.forEach((item) => {
      if (item?.fileSizeKb) {
        space += item?.fileSizeKb / 1024;
      }
    });
    setSpaceUsed(space.toFixed(1));
  };
  let connexUid = localStorage.getItem("connexUid");
  useEffect(() => {
    getContacts(connexUid, setLeads);
  }, []);


  let [leadModal, setleadModal] = useState(false);
  let handleLeadModal = () => {
    setleadModal(!leadModal);
  };
  let [lead, setLead] = useState({});
  let [deleteModal, setdeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  let [filtered, setfiltered] = useState([{}]);
  useEffect(() => {
    setfiltered(leads);
    calculateSpace();
  }, [leads]);

  useEffect(() => {
    if(resetFilterVal)
    {
      setfiltered(leads);
    }    
  }, [resetFilterVal]);

  useEffect(() => {
    
    filteredDataCallback(filtered)
  
  
}, [filtered]);

  const returnDate = (timestampInSeconds) => {
    // Convert to milliseconds
    const timestampInMilliseconds = timestampInSeconds * 1000;

    // Create a new Date object
    const date = new Date(timestampInMilliseconds);

    // Format the date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  //---------------------------------------------------(search functionality)-----------------------------------------------


  // let [search, setsearch] = useState("");

  useEffect(() => {
    const result = leads?.filter((contact) => {
      return contact?.name?.toLowerCase()?.match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);


  
    const getMemberbyId = (id) => {
      const member = Object.values(allProfiles)?.find((elm) => {
        return elm?.id === id;
      });
      return member;
    };

    
  let removeLastLead = () => {
    if (leads?.length < 2) {
      setLeads([]);
      setfiltered([]);
    }
  };
  // let [teamId, setTeamId] = useState("all");
  // let [userId, setUserId] = useState("all");

   // -----------------------filters----------------------

   useEffect(() => {
    if (teamId === "all") {
      setfiltered(leads);
    } else {
      const sddf = getMemberbyId("vpvnD8aq14eDf5pi5g8tkUxNMqz1");
      const filtered = leads?.filter((item) =>
        getMemberbyId(item?.userid)?.teams?.includes(teamId)
      );
      setfiltered(filtered);
    }
  }, [teamId]);

  useEffect(() => {
    if (userId === "all") {
      setfiltered(leads);
    } else {
      const filtered = leads?.filter((item) => item?.userid === userId);
      setfiltered(filtered);
    }
  }, [userId]);
  useEffect(() => {
    if (startDate != "" && endDate != "") {
     
      const firstDate = convertDateToMilli(startDate);
      const lastDate = convertDateToMilli(endDate);
      const filterOnDate = leads?.filter((elm) => {
        return elm?.timestamp >= firstDate && elm?.timestamp <= lastDate;
      });
      setfiltered(filterOnDate);
    }
  }, [startDate, endDate]);

  const convertDateToMilli = (datestr) => {
    // const selectedDate = new Date(date);
    // const dateMilliseconds = selectedDate.getTime();
    // console.log(dateMilliseconds);
    // return dateMilliseconds;

    const date = new Date(datestr);

    // Get the timestamp in milliseconds
    const timestampInMilliseconds = date.getTime();

    // Convert milliseconds to seconds
    const timestampInSeconds = Math.floor(timestampInMilliseconds / 1000);
    return timestampInSeconds;
  };

  // useEffect(() => {
  //   if (startDate != "" && endDate != "") {
  //     const firstDate = convertDateToMilli(startDate);
  //     const lastDate = convertDateToMilli(endDate);

  //     const filterOnDate = leads?.filter((elm) => {
  //       return elm?.date >= firstDate && elm?.date <= lastDate;
  //     });
  //     setfiltered(filterOnDate);
  //   }
  // }, [startDate, endDate]);

  
  const appendBucketPath = (path) => {
    let url = "";
    if (path !== "" && path !== undefined) {
      const filterUrl = path?.replace("gs://phonetapify-c6c06.appspot.com/", "");
      url = `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${filterUrl}?alt=media`;
    }
    else
    {
      url = prsnPlshldr;
    }
    return url;
  };
  return (
    // <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
    <>
      <DeleteContactModal
        deleteModal={deleteModal}
        handledeleteModal={handleDeleteModal}
        item={lead}
        action="lead"
        cb={removeLastLead}
      />
      <SingleLeadModal
        leadModal={leadModal}
        handleLeadModal={handleLeadModal}
        singleLead={lead}
      />


      <div className="sm:w-[100%] sm:h-[78%] w-[100%] h-[78%] flex justify-center overflow-y-scroll">
        <div className="w-[97%] ">
          <div className="w-[150%] flex flex-col items-center overflow-x-scroll pb-8">
            <div className="w-[95%] h-[47px] rounded-[36px] bg-[#ECEBEA] mt-[50px] flex justify-around items-center">
              {/* <div className="w-[5%]">
              <Checkbox defaultChecked color="default" />
            </div> */}

              <div className="w-[15%] ml-5">
                <p className="font-[500] sm:text-[16px] text-[12px]">
                  {t("Name")}
                </p>
              </div>
              {screen >= 450 ? (
                <div className="w-[20%] ">
                  <p className="font-[500] text-[16px]"> {t("Email")}</p>
                </div>
              ) : null}
              <div className="w-[18%] ">
                <p
                  className="font-[500] sm:text-[16px] text-[12px]"
                  style={
                    screen <= 450
                      ? { whiteSpace: "nowrap", marginLeft: "-13px" }
                      : null
                  }
                >
                  {t("Connected with")}
                </p>
              </div>
              {screen >= 450 ? (
                <div className="w-[15%] ">
                  <p className="font-[500] text-[16px]">{t("Lead Date")}</p>
                </div>
              ) : null}
              {screen >= 450 ? (
                <div className="w-[14%] ">
                  <p className="font-[500] text-[16px]">{t("Date")}</p>
                </div>
              ) : null}
              {screen >= 450 ? (
                <div className="w-[16%] ">
                  <p className="font-[500] text-[16px]">{t("Dropdown Option")}</p>
                </div>
              ) : null}
              {screen >= 450 ? (
                <div className="w-[15%] ">
                  <p className="font-[500] text-[16px]">{t("File")}</p>
                </div>
              ) : null}
              <div className="w-[15%] flex">
                <p className="font-[500] sm:text-[16px] text-[12px]">
                  {t("Actions")}
                </p>
              </div>
            </div>
            {filtered?.map((contact) => {
              return (
                <div
                  className="w-[95%] h-[83px] rounded-[37px] bg-[white] flex justify-around items-center shadow-xl mt-4 cursor-pointer"
                  onClick={() =>
                    setLead({
                      ...contact,
                      contactImage: appendBucketPath(contact?.image),
                      userImage: getMemberbyId(contact?.userid)?.profileUrl,
                    })
                  }
                >
                  <div className="flex items-center w-[15%] ml-2">
                    <img
                      src={
                        contact?.image
                          ? appendBucketPath(contact?.image)
                          : prsnPlshldr
                      }
                      alt=""
                      className="h-[46px] w-[46px] rounded-full object-cover"
                    />
                    <p className="text-[12px] font-[500] ml-[5px]">
                      {contact?.name}
                    </p>
                  </div>
                  {screen >= 450 ? (
                    <div className="w-[20%] ml-2">
                      <p className="font-[500] text-[12px] w-[100%] break-all">
                        {contact?.email}
                      </p>
                    </div>
                  ) : null}
                  <div className="flex items-center w-[18%] ">
                    <img
                      src={
                        getMemberbyId(contact?.userid)?.profileUrl
                          ? getMemberbyId(contact?.userid)?.profileUrl
                          : prsnPlshldr
                      }
                      alt=""
                      className="h-[46px] w-[46px] rounded-full object-cover"
                    />
                    <p className="text-[12px] font-[500] ml-[5px]">
                      {getMemberbyId(contact?.userid)?.name}
                    </p>
                  </div>
                  {screen >= 450 ? (
                    <div className="w-[15%]">
                      <p className="font-[500] text-[12px]">
                        {returnDate(contact?.timestamp ?? "")}
                      </p>
                    </div>
                  ) : null}
                  {screen >= 450 ? (
                    <div className="w-[15%]">
                      <p className="font-[500] text-[12px]">
                        {contact?.date ?? ""}
                      </p>
                    </div>
                  ) : null}
                   {screen >= 450 ? (
                    <div className="w-[15%]">
                      <p className="font-[500] text-[12px]">
                        {contact?.dropdown ?? ""}
                      </p>
                    </div>
                  ) : null}
                  {screen >= 450 ? (
                    <div className="w-[15%]">
                      {(contact?.file && contact?.file!="") && 
                      <a
                      href={contact?.file && contact?.file !== "" ? appendBucketPath(contact?.file) : "#"}
                      target="_blank"
                      className="font-[500] text-[12px] w-[50%] bg-[#3fb621] text-white text-center px-2 py-1 rounded-md"
                      >View</a>
                      }
                    </div>
                  ) : null}
                  <div className="flex w-[15%]">
                    <div onClick={() => handleDeleteModal()}>
                      <FaRegTrashCan className="text-2xl ml-3" />
                    </div>
                    <div className=" flex" onClick={() => handleLeadModal()}>
                      <FaEye className="text-2xl ml-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
     
      </>
  );
};

export default Leads;
