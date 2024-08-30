import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdArrowDropDown, MdOutlinePerson3 } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { Chart as ChartJs, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BarChart } from "@mui/x-charts/BarChart";
import NavbarFooter from "./NavbarFooter";
import {
  getAllChilds,
  getAllTeams,
  getSingleChild,
  getSingleChildAnalytics,
  getTeamAnalytics,
  splitString,
  getChildProfiles,
} from "../Services";
import { Checkbox, Menu, MenuItem, Tooltip } from "@mui/material";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import CompanyProfile from "../components/SettingsComponents/CompanyProfile";
import { MdOutlineFilterList } from "react-icons/md";
import { MoonLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { returnIconsByArray } from "../assets/ReturnSocialIcons";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

const Analytics = () => {
  ChartJs.register(ArcElement);
  let returnGraphData = (val1, val2, clr) => {
    let totalVal = val2 < 1 ? 100 : val2;
    const data = {
      datasets: [
        {
          data: [val1, totalVal],
          backgroundColor: [clr, "#DADADA"],
        },
      ],
    };
    return data;
  };
  var screen = window.innerWidth;
  const returnIds = (members) => {
    return members?.map((item) => item.id);
  };
  let [allProfiles, setAllProfiles] = useState(null);
  const [allProfilesIds, setAllProfilesIds] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
    setAllProfilesIds(returnIds(Object.values(obj)));
  };

  let [childProfiles, setChildProfiles] = useState(null);
  const [childProfilesIds, setChildProfilesIds] = useState([]);

  let getChildProfilesData = (obj) => {
    console.log(obj)
    setChildProfiles(Object.values(obj));
    setChildProfilesIds(returnIds(Object.values(obj)));
  };

  // console.log(allProfilesIds);

  const [anchorEl, setAnchorEl] = useState(null);
  let [loading, setloading] = useState(false);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);

  const open2 = Boolean(anchorEl2);

  const handleClickListItem2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [anchorEl3, setAnchorEl3] = useState(null);

  const open3 = Boolean(anchorEl3);

  const handleClickListItem3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };


  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4)
  const handleClickListItem4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClose4 = () => {
    console.log("close4")
    setAnchorEl4(null);
  };

  let [companyId, setCompanyId] = useState("");
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");
  let [companyProfile, setCompanyProfile] = useState({});
  let [selectedUser, setSelectedUser] = useState({});
  let [selectedProfile, setSelectedProfile] = useState({});
  let [analytics, setAnalytics] = useState({});
  let [filter, setfilter] = useState("Total");

  // console.log(analytics);
  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);

  useEffect(() => {
    getAllChilds(getAllProfiles, () => console.log("test"));
  }, []);

  useEffect(() => {
    setSelectedUser(companyProfile?.[companyId])
  }, [companyProfile?.[companyId]?.id])

  useEffect(() => {
    console.log("child profile test34")
    setChildProfiles({});
    getChildProfiles(selectedUser?.accountID, getChildProfilesData, () => console.log("child profile test"));
  }, [selectedUser?.id]);

  useEffect(() => {
    getSingleChild(companyId, setCompanyProfile);
  }, [companyId]);

  // useEffect(() => {
  //   console.log(allProfilesIds);
  //   const getAllTeamStats = async () => {
  //     // setSelectedUser({});
  //     if (allProfilesIds?.length > 0) {
  //       getTeamAnalytics(
  //         [...allProfilesIds, companyId],
  //         setAnalytics,
  //         setloading
  //       );

  //     }
  //   };
  //   try {
  //     Promise.all(allProfilesIds)?.then(() => {
  //       getAllTeamStats();
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }, [allProfilesIds]);

  // console.log(selectedUser);

  useEffect(() => {
    getSingleChildAnalytics(companyId, setAnalytics, setloading);
  }, [companyId]);

  // console.log(analytics);

  let returnAnalyticsData = (filter, value, analyticdata) => {
    if (analyticdata) {
      let data = Object.values(analyticdata)?.[0];
      if (value === "leads") {
        if (filter === "Total") {
          return data?.overallContactsMe;
        } else if (filter === "Past 1 week") {
          return data?.tContactsMeCrntWk;
        } else if (filter === "Past 1 Month") {
          return data?.tContactsMeCrntMnth;
        } else if (filter === "Past 1 Year") {
          return data?.tContactsMeCrntYear;
        } else if (filter === "Today") {
          return data?.tContactsMeToday;
        } else {
          return 0;
        }
      } else if (value === "views") {
        if (filter === "Total") {
          return data?.overallClicks;
        } else if (filter === "Past 1 week") {
          return data?.totalClicks;
        } else if (filter === "Past 1 Month") {
          return data?.totalClicksCrntMnth;
        } else if (filter === "Past 1 Year") {
          return data?.totalClicksCrntYear;
        } else if (filter === "Today") {
          return data?.totalClicksToday;
        }
      } else if (value === "links") {
        if (filter === "Total") {
          return data?.overallLinksEng;
        } else if (filter === "Past 1 week") {
          return data?.linksEngCrntWk;
        } else if (filter === "Past 1 Month") {
          return data?.linksEngCrntMnth;
        } else if (filter === "Past 1 Year") {
          return data?.linksEngCrntYear;
        } else if (filter === "Today") {
          return data?.linksEngToday;
        }
      } else if (value === "reviews") {
        if (filter === "Total") {
          return data?.overallReviews;
        } else if (filter === "Past 1 week") {
          return data?.tReviewsCrntWk;
        } else if (filter === "Past 1 Month") {
          return data?.tReviewsCrntMnth;
        } else if (filter === "Past 1 Year") {
          return data?.tReviewsCrntYear;
        } else if (filter === "Today") {
          return data?.tReviewsToday;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  };

  // console.log(analytics);

  // -----------------------getting all subteams----------------------

  let [teams, setTeams] = useState([]);
  // let [loading, setloading] = useState(false);
  let getTeams = (value) => {
    if (value) {
      setTeams(Object.values(value));
    }
  };

  useEffect(() => {
    getAllTeams(getTeams, setloading);
  }, []);

  const [team, setTeam] = useState("Select Team");
  const { t } = useTranslation();

  let filterData = [
    t("Total"),
    t("Today"),
    t("Past 1 week"),
    t("Past 1 Month"),
    t("Past 1 Year"),
  ];

  // console.log(Object.values(analytics)?.[0]);

  const [isNameFilter, setIsNameFilter] = useState(true);

  if(selectedUser?.profileType === "Google Review")
  {
    var GraphColors = ["#d10f25", "#ac8b42"];
    var graphLines =
        [          
          returnAnalyticsData(filter, "views", analytics),
          returnAnalyticsData(filter, "reviews", analytics) // Corrected this line
        ];
    var GraphLables = [t("Total Views"), t("Total Reviews")];
  }
  else if(selectedUser?.profileType === "Open House" || selectedUser?.profileType === "Open House")
  {
    var GraphColors = ["#0f42d1", "#d10f25"];
    var graphLines = [          
          returnAnalyticsData(filter, "views", analytics),
          returnAnalyticsData(filter, "links", analytics) // Corrected this line
        ];
    var GraphLables = [t("Total Clicks"), t("Total Views")];
  }
  else
  {
    var GraphColors = ["#0f42d1", "#d10f25", "#2cf525"];
    var GraphLables = [t("Total Clicks"), t("Total Views"), t("Total Leads")];
    var graphLines = [
      returnAnalyticsData(filter, "links", analytics),
      returnAnalyticsData(filter, "views", analytics),
      returnAnalyticsData(filter, "leads", analytics)
    ];
  }
  
  const data = {
    labels: GraphLables,
     datasets: [
      {
        data: graphLines,
        backgroundColor: GraphColors,
        borderColor: GraphColors,
        borderWidth: 1,
      }
    ],    
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const changeSelectedStat = (value) => {
    if (value) {
      setIsNameFilter(true);
      setSelectedUser(companyProfile?.[companyId]),
        getSingleChildAnalytics(companyId, setAnalytics, setloading);
    } else {
      setIsNameFilter(false);
      getTeamAnalytics(
        Object.values(teams)?.[0]?.members,
        setAnalytics,
        setloading
      );
      setTeam(Object.values(teams)?.[0]?.teamName);
    }
  };

  const mergeDuplicates = (arr) => {
    const merged = arr?.reduce((acc, curr) => {
      const existing = acc?.find((item) => item.linkID === curr.linkID);
      if (existing) {
        existing.clicks += curr.clicks;
      } else {
        acc?.push({ ...curr });
      }
      return acc;
    }, []);
    return merged;
  };


  const mergeDuplicatesOptions = (arr) => {
    const merged = arr?.reduce((acc, curr) => {
      const existing = acc?.find((item) => item?.option === curr?.option);
      if (existing) {
        existing.counts += curr?.counts;
      } else {
        acc?.push({ ...curr });
      }
      return acc;
    }, []);
    return merged;
  };

  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
      {screen >= 450 ? <Sidebar /> : null}
      <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
        <div className="w-[90%] ">
          <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]">
            <div className="w-[15%] h-[100%] flex items-center">
              <p className="font-[600] sm:text-[20px] text-[16px]">
                {t("Analytics")}
              </p>
            </div>
            <div
              className="sm:w-[80%] w-[100%] h-[100%] flex justify-end"
              style={screen <= 450 ? { width: "70%" } : null}
            >
              <div
                component="nav"
                aria-label="Device settings"
                id="lang-button2"
                aria-haspopup="listbox"
                aria-controls="filter"
                onClick={handleClickListItem2}
                className="w-[154px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer mr-4"
              >
                <p className="font-[500] text-[14px]">{filter}</p>
                <MdOutlineFilterList className="text-2xl" />
              </div>
              <Menu
                id="filter"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                MenuListProps={{
                  "aria-labelledby": "lang-button2",
                  role: "listbox",
                }}
              >
                {filterData?.map((elm) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        handleClose2(), setfilter(elm);
                      }}
                      sx={{ display: "flex" }}
                    >
                      <p className="font-[500] ml-2 text-base">{elm}</p>
                    </MenuItem>
                  );
                })}
              </Menu>
              <div className="w-[200px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-evenly items-center cursor-pointer mr-4 ">
                <Checkbox
                  checked={!isNameFilter}
                  onChange={() => changeSelectedStat(false)}
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
                <div
                  component="nav"
                  id="company-menu"
                  aria-haspopup="listbox"
                  aria-controls="company-menu"
                  onClick={!isNameFilter ? handleClickListItem3 : () => { }}
                  className="w-[140px] h-[100%]  flex justify-evenly items-center cursor-pointer opacity-[25%] "
                  style={{ opacity: isNameFilter ? "25%" : "100%" }}
                >
                  <p className="font-[500] text-[15px]">
                    {team ? splitString(team, 11) : "Select Team"}
                  </p>
                  <MdArrowDropDown className="text-2xl" />
                </div>
              </div>


              { /************** team menus *****************/}
              <Menu
                id="company-menu"
                anchorEl={anchorEl3}
                open={open3}
                onClose={handleClose3}
                MenuListProps={{
                  "aria-labelledby": "lang-button",
                  role: "listbox",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose3();
                  }}
                  sx={{ display: "flex" }}
                >
                  <p className="font-[500] ml-2 text-base">Select Team</p>
                </MenuItem>
                {Object.values(teams)?.map((elm, index) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        getTeamAnalytics(
                          elm?.members,
                          setAnalytics,
                          setloading
                        );
                        setTeam(elm?.teamName);
                        handleClose3();
                      }}
                      sx={{ display: "flex" }}
                    >
                      <p className="font-[500] ml-2 text-base">
                        {elm?.teamName}
                      </p>
                    </MenuItem>
                  );
                })}
              </Menu>


              { /************** User menus *****************/}
              <div className="w-[220px] h-[100%] rounded-[36px] mr-4 bg-white shadow-xl flex justify-evenly items-center cursor-pointer">
                <Checkbox
                  // {...label}
                  checked={isNameFilter}
                  onChange={() => changeSelectedStat(true)}
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />

                <div
                  component="nav"
                  id="lang-button"
                  aria-haspopup="listbox"
                  aria-controls="lang-menu"
                  onClick={isNameFilter ? handleClickListItem : () => { }}
                  className="w-[179px] h-[100%]  flex justify-evenly items-center cursor-pointer"
                  style={{ opacity: isNameFilter ? "100%" : "25%" }}
                >
                  <p className="font-[500] text-[15px]">
                    {selectedUser
                      ? splitString(
                        selectedUser?.name
                          ? selectedUser?.name
                          : companyProfile?.[companyId]?.name,
                        11
                      )
                      : "Select User"}
                  </p>
                  <MdArrowDropDown className="text-2xl" />
                </div>
                <Menu
                  id="lang-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "lang-button",
                    role: "listbox",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      getTeamAnalytics(
                        [...allProfilesIds, companyId],
                        setAnalytics,
                        setloading
                      ),
                        setSelectedUser({ name: "All" });
                      handleClose();
                    }}
                    sx={{ display: "flex" }}
                  >
                    <p className="font-[500] ml-2 text-base">All</p>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setSelectedUser(companyProfile?.[companyId]),
                        getSingleChildAnalytics(
                          companyId,
                          setAnalytics,
                          setloading
                        ),
                        handleClose();
                    }}
                    sx={{ display: "flex" }}
                  >
                    <img
                      src={
                        companyProfile?.[companyId]?.profileUrl
                          ? companyProfile?.[companyId]?.profileUrl
                          : prsnPlshldr
                      }
                      alt=""
                      className="h-[27px] w-[27px] object-cover"
                    />
                    <p className="font-[500] ml-2 text-base">
                      {companyProfile?.[companyId]?.name}
                    </p>
                  </MenuItem>
                  {allProfiles?.map((elm, index) => {
                    return (
                      <MenuItem
                        key={index}
                        // disabled={index === 0}
                        // selected={index === selectedIndex}
                        // onClick={(event) => handleMenuItemClick(event, index)}
                        onClick={() => {
                          setSelectedUser(elm),
                          setSelectedProfile(elm),
                              handleClose(),
                            getSingleChildAnalytics(
                              elm?.id,
                              setAnalytics,
                              setloading
                            );
                        }}
                        sx={{ display: "flex" }}
                      >
                        <img
                          src={elm?.profileUrl ? elm?.profileUrl : prsnPlshldr}
                          alt=""
                          className="h-[27px] w-[27px] object-cover"
                        />
                        <p className="font-[500] ml-2 text-base">{elm?.name}</p>
                      </MenuItem>
                    );
                  })}
                </Menu>

              </div>

              { /************** Sub Users (Tags) menus *****************/}
              
              {childProfiles?.length > 1 && (
                <div className="w-[220px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-evenly items-center cursor-pointer">
                  <div
                  component="nav"
                  id="profiles-button"
                  aria-haspopup="listbox"
                  aria-controls="profiles-menu"
                  onClick={isNameFilter ? handleClickListItem4 : () => { }}
                  className="w-[179px] h-[100%]  flex justify-evenly items-center cursor-pointer"
                  style={{ opacity: isNameFilter ? "100%" : "25%" }}
                >
                  <p className="font-[500] text-[15px]">
                    {selectedProfile
                      ? splitString(
                        selectedProfile?.name
                          ? selectedProfile?.name
                          : companyProfile?.[companyId]?.name,
                        11
                      )
                      : "Select Tag"}
                  </p>
                  <MdArrowDropDown className="text-2xl" />
                </div>
                    <div className="menu-wrapper">
                  <Menu
                    id="profiles-menu"
                    anchorEl={anchorEl4}
                    open={open4}
                    onClose={handleClose4}
                    MenuListProps={{
                      "aria-labelledby": "profiles-button",
                      role: "listbox",
                    }}
                  >
                    {childProfiles?.map((elm, index) => {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            setSelectedProfile(elm),
                            handleClose4(),
                            getSingleChildAnalytics(
                              elm?.id,
                              setAnalytics,
                              setloading
                            );
                          }}
                          sx={{ display: "flex" }}
                        >
                          <img
                            src={elm?.profileUrl ? elm?.profileUrl : prsnPlshldr}
                            alt=""
                            className="h-[27px] w-[27px] object-cover"
                          />
                          <p className="font-[500] ml-2 text-base">{`${elm?.name} (${elm?.profileType})`}</p>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                    </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-[500px] w-[100%] flex justify-between  mt-[40px]">
            {/* {screen >= 450 ? ( */}
            <div className="w-[64%] h-[100%] flex flex-col justify-between">
              <div className="h-[67%] w-[100%] shadow-xl rounded-[37px] bg-white flex justify-center items-center">
                {!loading ? (
                  <div className="h-[90%] w-[90%] flex justify-center items-center">
                    {/* <BarChart
                      xAxis={[
                        {
                          id: "barCategories",
                          data: [
                            t("Total Clicks"),
                            t("Total Views"),
                            t("Total Leads"),
                          ],
                          scaleType: "band",
                        },
                      ]}
                      series={[
                        {
                          data: [
                            returnAnalyticsData(filter, "links", analytics),
                            returnAnalyticsData(filter, "views", analytics),
                            returnAnalyticsData(filter, "leads", analytics),
                          ],
                        },
                      ]}
                      colors={(["#0f42d1"], ["#d10f25"], ["#2cf525"])}
                      width={600}
                      height={350}
              
                    /> */}

                    <Bar data={data} options={options} />
                  </div>
                ) : (
                  <MoonLoader />
                )}
              </div>
              <div className="h-[32%] pb-2 mt-3 w-[100%] shadow-xl rounded-[37px] bg-white flex flex-col items-center">
                <p className="w-[100%] text-center text-sm mt-1">
                {selectedUser?.profileType === "Google Review" ?
                  t("Total reviews counts to date")
                  :
                  t("Total link clicks to date")
                }
                </p>
                <div
                  className="h-[90%] w-[100%] flex justify-center items-center"
                  style={{ overflowY: "scroll" }}
                >


                  { 
                  // if other tag is review, show total reviews
                  selectedUser?.profileType === "Google Review" ? analytics ? (
                    <div
                      className="w-[95%] h-[100%]  flex  gap-x-4  flex-wrap "
                      style={{ overflowY: "scroll" }}
                    >
                      {mergeDuplicatesOptions(
                        Object.values(analytics)?.[0]?.reviewOptions
                      )?.map((elm) => {
                        return (
                          <div className="w-[22%] h-[45px] rounded-lg border mt-3 flex items-center justify-around">
                            <p className="text-sm">{elm?.option}</p>
                            <p>{elm?.counts}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>{t("No Reviews to show")}</p>
                  )
                  :  // if other tag than reviews, show links clicks
                  analytics ? (
                    <div
                      className="w-[95%] h-[100%]  flex  gap-x-4  flex-wrap "
                      style={{ overflowY: "scroll" }}
                    >
                      {mergeDuplicates(
                        Object.values(analytics)?.[0]?.links
                      )?.map((elm) => {
                        return (
                          <div className="w-[22%] h-[45px] rounded-lg border mt-3 flex items-center justify-around">
                            <img
                              src={returnIconsByArray(elm?.name)}
                              alt=""
                              className="h-[30px] w-[30px]"
                            />
                            <p className="text-sm">{elm?.name}</p>
                            <p>{elm?.clicks}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>{t("No links to show")}</p>
                  )}
                </div>
              </div>
            </div>
            {/* ) : null} */}
            <div className={`h-[100%] sm:w-[34%] w-[100%] flex flex-col ${selectedUser?.profileType === "Digital Card" ? "justify-between" : "justify-start"}`}>
              
              {(!selectedUser?.profileType || selectedUser?.profileType == "Digital Card") && ( loading ? (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl flex justify-center items-center">
                  <MoonLoader size="40" />
                </div>
              ) : (
                <div className="h-[31%] w-[100%] mb-2 mt-2 bg-white rounded-[37px] shadow-xl ">
                  <Tooltip title="The number of times people submit the form">
                    <div className="w-[100%] h-[25%]  flex items-end">
                      <p className="flex font-[500] text-[16] ml-4 items-center">
                        {t("Leads Generated")}
                        <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                      </p>
                    </div>
                  </Tooltip>
                  <div className="w-[100%] h-[75%]  flex justify-around items-center">
                    <h2 className="font-[700] text-[48px] w-[35%]">
                      {returnAnalyticsData(filter, "leads", analytics)}
                    </h2>

                    <div className="w-[35%]">
                      <div
                        className="h-[75px]  w-[75px] mt-1"
                        style={{
                          height: "80px",
                          width: "80px",
                        }}
                      >
                        <Doughnut
                          data={returnGraphData(
                            returnAnalyticsData(filter, "leads", analytics),
                            returnAnalyticsData("Total", "leads", analytics),
                            "#2cf525"
                          )}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              { selectedUser?.profileType == "Google Review" && ( loading ? (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl flex justify-center items-center">
                  <MoonLoader size="40" />
                </div>
              ) : (
                <div className="h-[31%] w-[100%] mb-2 mt-2 bg-white rounded-[37px] shadow-xl ">
                  <Tooltip title="The number of times people submit the review">
                    <div className="w-[100%] h-[25%]  flex items-end">
                      <p className="flex font-[500] text-[16] ml-4 items-center">
                        {t("Reviews")}
                        <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                      </p>
                    </div>
                  </Tooltip>
                  <div className="w-[100%] h-[75%]  flex justify-around items-center">
                    <h2 className="font-[700] text-[48px] w-[35%]">
                      {returnAnalyticsData(filter, "reviews", analytics)}
                    </h2>

                    <div className="w-[35%]">
                      <div
                        className="h-[75px]  w-[75px] mt-1"
                        style={{
                          height: "80px",
                          width: "80px",
                        }}
                      >
                        <Doughnut
                          data={returnGraphData(
                            returnAnalyticsData(filter, "reviews", analytics),
                            returnAnalyticsData("Total", "reviews", analytics),
                            "#ac8b42"
                          )}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


              {selectedUser?.profileType != "Google Review" && ( loading ? (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl flex justify-center items-center">
                  <MoonLoader size="40" />
                </div>
              ) : (
                <div className="h-[31%] w-[100%] mb-2 mt-2 bg-white rounded-[37px] shadow-xl ">
                  <Tooltip title="The total number of times someone open your links">
                    <div className="w-[100%] h-[25%]  flex items-end">
                      <p className="flex font-[500] text-[16] ml-4 items-center">
                        {t("Link taps")}
                        <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                      </p>
                    </div>
                  </Tooltip>
                  <div className="w-[100%] h-[75%]  flex justify-around items-center">
                    <h2 className="font-[700] text-[48px] w-[35%]">
                      {returnAnalyticsData(filter, "links", analytics)}
                    </h2>

                    <div className="w-[35%]">
                      <div
                        className="h-[75px]  w-[75px] mt-1"
                        style={{
                          height: "80px",
                          width: "80px",
                        }}
                      >
                        <Doughnut
                          data={returnGraphData(
                            returnAnalyticsData(filter, "links", analytics),
                            returnAnalyticsData("Total", "links", analytics),
                            "#0f42d1"
                          )}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl flex justify-center items-center">
                  <MoonLoader size="40" />
                </div>
              ) : (
                <div className="h-[31%] w-[100%] mb-2 mt-2 bg-white rounded-[37px] shadow-xl ">
                  <Tooltip title="The Total number of times someone land on your Connex Profile">
                    <div className="w-[100%] h-[25%]  flex items-end">
                      <p className="flex font-[500] text-[16] ml-4 items-center">
                        {t("Card Views")}
                        <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                      </p>
                    </div>
                  </Tooltip>
                  <div className="w-[100%] h-[75%]  flex justify-around items-center">
                    <h2 className="font-[700] text-[48px] w-[35%]">
                      {returnAnalyticsData(filter, "views", analytics)}
                    </h2>

                    <div className="w-[35%]">
                      <div
                        className="h-[75px]  w-[75px] mt-1"
                        style={{
                          height: "80px",
                          width: "80px",
                        }}
                      >
                        <Doughnut
                          data={returnGraphData(
                            returnAnalyticsData(filter, "views", analytics),
                            returnAnalyticsData("Total", "views", analytics),
                            "#d10f25"
                          )}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <br />
        </div>
      </div>
      {screen <= 450 ? <NavbarFooter /> : null}
    </div>
  );
};

export default Analytics;
