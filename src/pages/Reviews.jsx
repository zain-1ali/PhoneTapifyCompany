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

const Reviews = ({search, userId, teamId, allProfiles, startDate, endDate, resetFilterVal, filteredDataCallback}) => {
  let [reviews, setReviews] = useState([]);
  var screen = window.innerWidth;
  const { t } = useTranslation();

  let connexUid = localStorage.getItem("connexUid");
  // let [teamId, setTeamId] = useState("all");
  // let [userId, setUserId] = useState("all");
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

  // console.log(filtered);

  // let [search, setsearch] = useState("");

  useEffect(() => {
    const result = reviews?.filter((contact) => {
      return contact?.name?.toLowerCase()?.match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);



  let removeLastReview = () => {
    if (review?.length < 2) {
      setReviews([]);
      setfiltered([]);
    }
  };
  


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
      const df = getMemberbyId(userId);
      console.log(reviews);
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

  useEffect(() => {
    if(resetFilterVal)
    {
      setfiltered(reviews);
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

  // let [startDate, setStartDate] = useState("");
  // let [endDate, setEndDate] = useState("");

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
      const filterOnDate = reviews?.filter((elm) => {
        return elm?.timestamp >= firstDate && elm?.timestamp <= lastDate;
      });
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
      const filterUrl = path?.replace("gs://phonetapify-c6c06.appspot.com/", "");
      url = `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${filterUrl}?alt=media`;
    }
    return url;
  };

  return (
    // <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
    <>
      <DeleteContactModal
        deleteModal={deleteModal}
        handledeleteModal={handleDeleteModal}
        item={review}
        action="review"
        cb={removeLastReview}
      />
      <SingleReviewModal
        reviewModal={reviewModal}
        handleReviewModal={handleReviewModal}
        singleReview={review}
      />


      <div className="sm:w-[100%] w-[100%] flex justify-center overflow-y-scroll">
        <div className="w-[97%] ">
          
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
    </>
  );
};

export default Reviews;
