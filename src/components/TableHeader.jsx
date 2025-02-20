import React, { useEffect, useState, useRef } from "react";
import { getAllChilds, getAllTeams, getContacts } from "../Services";
import { useTranslation } from "react-i18next";
import { BiSearchAlt } from "react-icons/bi";
import { MdArrowDropDown, MdOutlineFilterList } from "react-icons/md";
import { Checkbox, Menu, Tooltip } from "@mui/material";
import { FaEye, FaSquarePlus } from "react-icons/fa6";
import csv from "../imgs/csv.png";
import Leads from "../pages/Leads";
import Reviews from "../pages/Reviews";
import NavbarFooter from "../pages/NavbarFooter";
import Sidebar from "../components/Sidebar";
import DownloadCsv from "../components/DownloadCsv";
import { TfiDownload } from "react-icons/tfi";

const TableHeader = () => {
  
  var screen = window.innerWidth;
    // -----------------------getting all subteams----------------------

    let [selectedModule, setSelectedModule] = useState("leads");
    let [teams, setTeams] = useState([]);
    let [loading, setloading] = useState(false);
    let [resetFilter, setResetFilter] = useState(false);
    let [downloadCsv, setDownloadCsv] = useState(false);
    let [filtered, setFiltered] = useState(null);
    let [spaceUsed, setSpaceUsed] = useState(0);
    console.log(spaceUsed);
    
    // console.log(resetFilter)
    let getTeams = (value) => {
      if (value) {
        setTeams(Object.values(value));
      }
    };
  
    let filteredDataCallback = (data) => {
      setFiltered(data); 
    };
  

    useEffect(() => {
      getAllTeams(getTeams, setloading);
    }, []);

      // -----------------------getting all users----------------------
  let [allProfiles, setAllProfiles] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
  };

  useEffect(() => {
    getAllChilds(getAllProfiles, () => console.log("test"));
  }, []);

   
  let [search, setsearch] = useState("");

  // useEffect(() => {
  //   // const result = leads?.filter((contact) => {
  //   //   return contact?.name?.toLowerCase()?.match(search.toLowerCase());
  //   // });

  //   // setfiltered(result);
  // }, [search]);

  let [teamId, setTeamId] = useState("all");
  let [userId, setUserId] = useState("all");

  const [anchorEl2, setAnchorEl2] = useState(null);

  const open2 = Boolean(anchorEl2);

  const handleClickListItem2 = (event) => {
    setAnchorEl2(event.currentTarget);
    setResetFilter(false);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  const { t } = useTranslation();

  
  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
    {screen >= 450 ? <Sidebar /> : null}

    <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
    <div className="w-[97%] ">
      <div
        className="w-[100%] flex justify-between items-center h-[80px]  mt-[30px]"
        style={
          screen <= 450 ? { alignItems: "center", height: "42px" } : null
        }
      >
        <div className="w-[25%] h-[100%] flex items-center">
          <p
            className="font-[600] sm:text-[20px] text-[11px]"
            style={
              screen <= 450
                ? {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    flexDirection: "column",
                  }
                : null
            }
          >
            
            { selectedModule == "leads" ? t("Leads Generated") : t("Google Reviews")}
            <span className="font-[500] sm:text-[10px] text-[12px] text-[#9B9B9B]">
              ({filtered?.length})
            </span>
          </p>
        </div>

        <div className="w-[100%] h-[100%] flex justify-end items-center gap-3">
          <div
            component="nav"
            aria-label="Device settings"
            id="lang-button2"
            aria-haspopup="listbox"
            aria-controls="filter"
            onClick={handleClickListItem2}
            className="w-[154px] h-[50px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer"
          >
            <p className="font-[500] text-[16px]">Filter</p>
            <MdOutlineFilterList className="text-2xl" />
          </div>
          <Menu
            id="filter"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            sx={{ marginTop: 1 }}
            MenuListProps={{
              "aria-labelledby": "lang-button2",
              role: "listbox",
            }}
          >
            <div className="w-[310px] h-[320px] bg-white flex flex-col justify-arround">
              <div className="w-[100%] flex justify-around mb-3">
                <div className="w-[92%]">
                  <p className="text-sm">By Type</p>
                  <div className="sm:w-[100%] sm:h-[50px]   w-[100%] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer border">
                    <select
                      name=""
                      id=""
                      className="w-[90%] outline-none"
                      onChange={(e) => setSelectedModule(e.target.value)}
                      value={selectedModule}
                    >
                      <option value="leads">Leads</option>
                      <option value="reviews">Reviews</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-[100%] flex justify-around">
              
                <div>
                  <p className="text-sm">By Team</p>
                  <div className="sm:w-[130px] sm:h-[50px]   w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer border">
                    <select
                      name=""
                      id=""
                      className="w-[90%] outline-none"
                      onChange={(e) => setTeamId(e.target.value)}
                      value={teamId}
                    >
                      <option value="all">All</option>
                      {Object.values(teams)?.map((elm) => {
                        return (
                          <option value={elm?.teamId}>
                            {elm?.teamName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <p className="text-sm">By Name</p>
                  <div className="sm:w-[130px] sm:h-[50px]  w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer border">
                    <select
                      name=""
                      id=""
                      className="w-[90%] outline-none"
                      onChange={(e) => setUserId(e.target.value)}
                      value={userId}
                    >
                      <option value="all">All</option>
                      {
                        selectedModule == "leads" ? (Object.values(allProfiles)?.filter(elm => elm.profileType === "Digital Card").map((elm) => {
                          return <option value={elm?.id}>{elm?.name}</option>;
                        })) : 
                        (
                          Object.values(allProfiles)?.filter(elm => elm.profileType === "Google Review").map((elm) => {
                            return <option value={elm?.id}>{elm?.name}</option>;
                          })
                        )
                      }
                     
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-around w-[100%] mt-5">
                <div className="h-[50px]">
                  <p className="text-sm">{t("Start Date")}</p>
                  <div className="sm:w-[130px] sm:h-[100%] p-2   w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl border flex justify-around items-center cursor-pointer">
                    <input
                      type="date"
                      className="h-[90%] w-[90%] text-xs rounded-[36px]"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                    />
                  </div>
                </div>
                <div className="h-[50px] ">
                  <p className="text-sm">{t("End Date")}</p>
                  <div className="sm:w-[130px] sm:h-[100%] p-2   w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex border justify-around items-center cursor-pointer">
                    <input
                      type="date"
                      className="h-[90%] w-[90%] text-xs rounded-[36px]"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-around w-[100%] mt-5">
                <div className="h-[50px] w-[100%] flex justify-center mt-3">
                  <div
                    className="sm:w-[92%] sm:h-[100%] p-2   w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl border flex justify-around items-center cursor-pointer text-sm font-[500]"
                    onClick={() => {
                      setTeamId("all"),
                        setUserId("all"),
                        setStartDate(""),
                        setEndDate(""),
                        handleClose2();
                        setResetFilter(true);
                    }}
                  >
                    Reset Filter
                  </div>
                </div>
              </div>
            </div>
          </Menu>

          <div className="sm:w-[254px] sm:h-[50px] w-[100px] h-[33px] flex items-center rounded-[36px] bg-white shadow-xl">
            {screen <= 450 ? (
              <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />
            ) : null}
            <input
              type="text"
              className="h-[100%] sm:w-[77%] w-[40px] outline-none rounded-[36px] sm:pl-[10px] pl-[0px] sm:ml-2 "
              style={screen <= 450 ? { fontSize: "11px" } : null}
              placeholder={t("Search")}
              onChange={(e) => setsearch(e.target.value)}
              value={search}
            />
            {screen >= 450 ? (
              <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />
            ) : null}
          </div>

          <div 
            className="sm:w-[185px] sm:h-[50px] border  w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer"
            onClick={() => setDownloadCsv(true)}
          >
            <img
              src={csv}
              alt=""
              className="sm:h-[37px] h-[20px] sm:w-[37px] w-[20px]"
              style={screen <= 450 ? { marginLeft: "-4px" } : null}
            />
            <p
              className="font-[500] sm:text-[15px] text-[8px]"
              style={
                screen <= 450
                  ? { marginLeft: "-14px", whiteSpace: "nowrap" }
                  : null
              }
            >
              {filtered ? <DownloadCsv data={filtered} /> : t("Export CSV")}
            </p>
            {screen >= 450 ? (
              <TfiDownload className="text-lg mr-2" />
            ) : null}
          </div>
        </div>
        
      </div>
      <div className="w-[100%] text-end font-bold mr-6">{spaceUsed > 100 && <span className="bg-[#3fb621] text-[12px] text-white text-center px-2 py-1 rounded-md cursor-pointer mr-2">Upgrade to 100GB</span>} Space Used: {spaceUsed}MBs / 100.0MBs</div>
      {
        selectedModule == "leads" ? (
          <Leads search = {search}
          userId = {userId} 
          teamId = {teamId} 
          allProfiles = {allProfiles}
          startDate ={startDate} 
          endDate = {endDate} 
          resetFilterVal = {resetFilter}
          filteredDataCallback = {filteredDataCallback}
          spaceUsed = {spaceUsed}
          setSpaceUsed = {setSpaceUsed}
        />
        ) :
        (
          <Reviews search = {search}
          userId = {userId} 
          teamId = {teamId} 
          allProfiles = {allProfiles}
          startDate ={startDate} 
          endDate = {endDate} 
          resetFilterVal = {resetFilter}
          filteredDataCallback = {filteredDataCallback}
        />
        )
      }
      
      <br />
    </div>
    {/* <ToastContainer position="top-center" autoClose={2000} /> */}
  </div>

  
   {screen <= 450 ? <NavbarFooter /> : null}
   </div>
  );

};

export default TableHeader;
