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
import { getAllChilds, getAllTeams, getReviews } from "../Services";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import SingleReviewModal from "../components/Modals/SingleReviewModal";
// import DeleteContact from "../components/Modals/DeleteContactModal";
import DeleteContactModal from "../components/Modals/DeleteContactModal";
import DownloadCsv from "../components/DownloadCsv";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  let [reviews, setReviews] = useState([]);
  var screen = window.innerWidth;
  const { t } = useTranslation();

  let connexUid = localStorage.getItem("connexUid");
  useEffect(() => {
    getReviews(connexUid, setReviews);
  }, []);

  let [reviewModal, setreviewModal] = useState(false);
  let handleReviewModal = () => {
    setreviewModal(!reviewModal);
  };
  let [review, setReview] = useState({});
  let [deleteModal, setdeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  let [filtered, setfiltered] = useState([{}]);
  useEffect(() => {
    setfiltered(reviews);
  }, [reviews]);

  //---------------------------------------------------(search functionality)-----------------------------------------------

  console.log(filtered);

  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = reviews?.filter((contact) => {
      return contact?.name?.toLowerCase()?.match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);

  // -----------------------getting all subteams----------------------

  let [teams, setTeams] = useState([]);
  let [loading, setloading] = useState(false);
  let getTeams = (value) => {
    if (value) {
      setTeams(Object.values(value));
    }
  };

  useEffect(() => {
    getAllTeams(getTeams, setloading);
  }, []);

  let removeLastReview = () => {
    if (review?.length < 2) {
      setReviews([]);
      setfiltered([]);
    }
  };
  let [teamId, setTeamId] = useState("all");
  let [userId, setUserId] = useState("all");

  // -----------------------getting all users----------------------
  let [allProfiles, setAllProfiles] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
  };

  useEffect(() => {
    getAllChilds(getAllProfiles, () => console.log("test"));
  }, []);

  const getMemberbyId = (id) => {
    const member = Object.values(allProfiles)?.find((elm) => {
      return elm?.id === id;
    });
    return member;
  };

  // -----------------------filters----------------------

  useEffect(() => {
    if (teamId === "all") {
      setfiltered(reviews);
    } else {
      const filtered = reviews?.filter((item) =>
        getMemberbyId(item?.userid)?.teams?.includes(teamId)
      );
      setfiltered(filtered);
    }
  }, [teamId]);

  useEffect(() => {
    if (userId === "all") {
      setfiltered(reviews);
    } else {
      const filtered = reviews?.filter((item) => item?.userid === userId);
      setfiltered(filtered);
    }
  }, [userId]);

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

  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

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

  useEffect(() => {
    if (startDate != "" && endDate != "") {
      const firstDate = convertDateToMilli(startDate);
      const lastDate = convertDateToMilli(endDate);
      console.log(firstDate);
      console.log(lastDate);
      const filterOnDate = reviews?.filter((elm) => {
        return elm?.date >= firstDate && elm?.date <= lastDate;
      });
      console.log(filterOnDate);
      setfiltered(filterOnDate);
    }
  }, [startDate, endDate]);

  const [anchorEl2, setAnchorEl2] = useState(null);

  const open2 = Boolean(anchorEl2);

  const handleClickListItem2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const appendBucketPath = (path) => {
    let url = "";
    if (path !== "") {
      const filterUrl = path?.replace("gs://connexcard-8ad69.appspot.com/", "");
      url = `https://firebasestorage.googleapis.com/v0/b/connexcard-8ad69.appspot.com/o/${filterUrl}?alt=media`;
    }
    return url;
  };

  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
      <DeleteContactModal
        deleteModal={deleteModal}
        handledeleteModal={handleDeleteModal}
        review={review}
        cb={removeLastReview}
      />
      <SingleReviewModal
        reviewModal={reviewModal}
        handleReviewModal={handleReviewModal}
        singleReview={review}
      />

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
                {t("Google Reviews")}
                <span className="font-[500] sm:text-[10px] text-[12px] text-[#9B9B9B]">
                  ({reviews?.length})
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
                <div className="w-[310px] h-[230px] bg-white flex flex-col justify-arround">
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
                          {Object.values(allProfiles)?.filter(elm => elm.profileType === "Google Review").map((elm) => {
                            return <option value={elm?.id}>{elm?.name}</option>;
                          })}
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
                            handleClose2(),
                            setfiltered(reviews);
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

              <div className="sm:w-[185px] sm:h-[50px] border  w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
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
          <div className="w-[100%] flex flex-col items-center">
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
                <div className="w-[15%] ">
                  <p className="font-[500] text-[16px]"> {t("Email")}</p>
                </div>
              ) : null}
               {screen >= 450 ? (
                <div className="w-[11%] ">
                  <p className="font-[500] text-[16px]"> {t("Option")}</p>
                </div>
              ) : null}
              <div className="w-[15%] ">
                <p
                  className="font-[500] sm:text-[16px] text-[12px]"
                  style={
                    screen <= 450
                      ? { whiteSpace: "nowrap", marginLeft: "-13px" }
                      : null
                  }
                >
                  {t("Given to")}
                </p>
              </div>
              {screen >= 450 ? (
                <div className="w-[15%] ">
                  <p className="font-[500] text-[16px]">{t("Date")}</p>
                </div>
              ) : null}
              <div className="w-[15%] flex">
                <p className="font-[500] sm:text-[16px] text-[12px]">
                  {t("Actions")}
                </p>
              </div>
            </div>
            {filtered?.map((rev) => {
              return (
                <div
                  className="w-[95%] h-[83px] rounded-[37px] bg-[white] flex justify-around items-center shadow-xl mt-4 cursor-pointer"
                  onClick={() =>
                    setReview({
                      ...rev,
                      revImage: appendBucketPath(rev?.image),
                      userImage: getMemberbyId(rev?.userid)?.profileUrl,
                    })
                  }
                >
                  <div className="flex items-center w-[16%]">
                    <img
                      src={
                        rev?.image
                          ? appendBucketPath(rev?.image)
                          : prsnPlshldr
                      }
                      alt=""
                      className="h-[46px] w-[46px] rounded-full object-cover"
                    />
                    <p className="text-[12px] font-[500] ml-[5px]">
                      {rev?.name}
                    </p>
                  </div>
                  {screen >= 450 ? (
                    <div className="w-[16%] ml-2">
                      <p className="font-[500] text-[12px] w-[100%] break-all">
                        {rev?.email}
                      </p>
                    </div>
                  ) : null}
                  {screen >= 450 ? (
                    <div className="w-[10%] ml-2">
                      <p className="font-[500] text-[12px] w-[100%] break-all">
                        {rev?.option}
                      </p>
                    </div>
                  ) : null}
                  <div className="flex items-center w-[18%] ">
                    <img
                      src={
                        getMemberbyId(rev?.userid)?.profileUrl
                          ? getMemberbyId(rev?.userid)?.profileUrl
                          : prsnPlshldr
                      }
                      alt=""
                      className="h-[46px] w-[46px] rounded-full object-cover"
                    />
                    <p className="text-[12px] font-[500] ml-[5px]">
                      {getMemberbyId(rev?.userid)?.name}
                    </p>
                  </div>
                  {screen >= 450 ? (
                    <div className="w-[15%]">
                      <p className="font-[500] text-[12px]">
                        {returnDate(rev?.timestamp ?? "")}
                      </p>
                    </div>
                  ) : null}
                  <div className="flex w-[15%]">
                    <div onClick={() => handleDeleteModal()}>
                      <FaRegTrashCan className="text-2xl ml-3" />
                    </div>
                    <div className=" flex" onClick={() => handleReviewModal()}>
                      <FaEye className="text-2xl ml-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <br />
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
      {screen <= 450 ? <NavbarFooter /> : null}
    </div>
  );
};

export default Reviews;
