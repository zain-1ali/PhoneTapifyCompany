import styled from "@emotion/styled";
import { FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PiDotsSixBold } from "react-icons/pi";
import behance from "../../imgs/Behance.png";
import Linkedin from "../../imgs/Linkedin.png";
import Snapchat from "../../imgs/Snapchat.png";
import { useSelector } from "react-redux";
import { returnIcons } from "../../assets/ReturnSocialIcons";
import SocialLinkModal from "../Modals/SocialLinkModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  addtoDirect,
  handleChangeDirect,
  renoveLink,
  updateLeadMode,
  updateLinkShareAble,
} from "../../Services";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { setLinks } from "../../redux/profileInfoSlice";
import { useDispatch } from "react-redux";
import DeleteModal from "../Modals/DeleteModal";
import { useTranslation } from "react-i18next";

const Content = ({ uid }) => {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
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
  let dispatch = useDispatch();
  const leadMode = useSelector((state) => state.profileInfoSlice.leadMode);
  const directMode = useSelector((state) => state.profileInfoSlice.directMode);
  const direct = useSelector((state) => state.profileInfoSlice.direct);
  const links = useSelector((state) => state.profileInfoSlice.links);
  const featuredImages = useSelector(
    (state) => state.profileInfoSlice.featuredImages
  );

  const featuredVideos = useSelector(
    (state) => state.profileInfoSlice.featuredVideos
  );
  let [modal, setModal] = useState(false);
  let handleModal = () => {
    setModal(!modal);
  };

  
  // ------------------------------------------------Dragable functonality------------------------------------------

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(links);
  }, [links]);
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);
    // dispatch(Addlinks(updatedItems))
    setItems(updatedItems);
    dispatch(setLinks(updatedItems));
    set(ref(db, `Users/${uid}/links/`), [...updatedItems]).then(() => {});
  };

  let [deleteModal, setdeleteModal] = useState(false);
  let [teamId, setteamId] = useState("");

  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  let updateLinks = () => {
    if (links?.length < 2) {
      setLinks([]);
      setItems([]);
    }
  };
  const { t } = useTranslation();
  
  const appendBucketPath = (path) => {
    
    let url = "";
    if (path.startsWith("https://"))
    {
      url = path;
    }
    else if (path !== "") {
      const filterUrl = path?.replace("gs://phonetapify-c6c06.appspot.com/", "");
      url = `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${filterUrl}?alt=media`;
    }
    return url;
  };
  return (
    <div className="w-[90%] h-[90%] overflow-y-scroll">
      <div className="w-[100%] h-[100%]">
        <SocialLinkModal
          modal={modal}
          handleClose={handleModal}
          uid={uid}
          allProfiles={[]}
        />
        <DeleteModal
          deleteModal={deleteModal}
          handledeleteModal={handledeleteModal}
          text={t("Are you sure to delete this link?")}
          func={() =>
            renoveLink(
              {
                linkID: teamId,
              },
              uid,
              links,
              updateLinks,
              () => false,
              []
            )
          }
        />
        <div className="w-[100%] flex justify-between">
          <div className="sm:w-[55%] w-[100%] h-[50px]  rounded-[36px] shadow-lg flex justify-center items-center">
            <div className="flex w-[50%] items-center  justify-around ">
              <p className="font-[500] text-[14px] ml-2">{t("Lead Mode")}</p>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={leadMode}
                    onChange={() => updateLeadMode(leadMode, uid)}
                  />
                }
              />
            </div>
            <div className="flex w-[50%] items-center  justify-around ">
              <p className="font-[500] text-[14px] ml-2">{t("Direct Mode")}</p>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={directMode}
                    onChange={() => handleChangeDirect(directMode, uid, links)}
                  />
                }
              />
            </div>
          </div>

          <div
            className="sm:w-[40%] w-[29%] h-[50px]  rounded-[36px] shadow-lg  flex justify-center items-center cursor-pointer"
            onClick={() => handleModal()}
          >
            <p className="font-[500] sm:text-[15px] text-[8px] text-center">
              {t("Add Links & Contacts")}
            </p>
          </div>
        </div>
        {links?.length > 0 ||
        featuredImages?.length > 0 ||
        featuredVideos?.length > 0 ? (
          <>
            {/*---------------mapping images------------- */}
            {featuredImages?.length > 0 && (
              <>
                <h2 className="mt-4">Images:</h2>
                <div className="w-[100%]  flex justify-start gap-x-6 flex-wrap mt-2">
                  {featuredImages?.map((elm, i) => {
                    return (
                      <div className="sm:w-[190px] w-[49%] h-[180px] rounded-[24px] shadow-lg mt-1">
                        <img
                          src={appendBucketPath(elm?.imageUrl)}
                          alt=""
                          className="rounded-[24px] object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {/*---------------mapping video------------- */}
            {featuredVideos?.length > 0 && (
              <>
                <h2 className="mt-8">Videos:</h2>
                <div className="w-[100%]  flex justify-start gap-x-6 flex-wrap mt-2">
                  {featuredVideos?.map((elm, i) => {
                    return (
                      <div
                        className="sm:w-[310px] w-[52%] h-[150px] rounded-[24px] shadow-lg  border"
                        key={i}
                      >
                        <video
                          src={appendBucketPath(elm?.videoUrl)}
                          controls
                          className="max-h-[150px] h-[100%] w-[100%] rounded-xl"
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {/*---------------mapping social links------------- */}
            {links?.length > 0 && (
              <>
                <h2 className="mt-8">Links:</h2>
                {directMode ? (
                  <div className="w-[100%]  flex justify-start gap-x-6 flex-wrap mt-2">
                    {directMode && (
                      <div className="sm:w-[190px] w-[49%] h-[180px] rounded-[24px] shadow-lg mt-6">
                        <div className="mt-3">
                          <div className="w-[100%] flex justify-center items-center ">
                            <PiDotsSixBold className="text-2xl text-[#EDEDED] cursor-grab" />
                          </div>
                          <div className="w-[100%] flex flex-col justify-center items-center mt-4">
                            <img
                              src={
                                direct?.image
                                  ? direct?.image
                                  : returnIcons(direct?.linkID)
                              }
                              alt=""
                              className="h-[45px] w-[45px] object-cover"
                              style={{
                                borderRadius: direct?.image ? "10px" : "0px",
                              }}
                            />
                            <h2 className="font-[500] text-[15px] mt-2">
                              {direct?.name}
                            </h2>
                          </div>
                        </div>
                        <div className="w-[100%] flex justify-center items-center mt-4">
                          {/* <button className="w-[62px] h-[27px] rounded-[16px] border mr-1 text-[8px] font-[500]">
                    Remove Link
                  </button>
                  <button className="w-[62px] h-[27px] rounded-[16px] border ml-1 text-[8px] font-[500] bg-black text-white">
                    Open Link
                  </button> */}
                        </div>
                      </div>
                    )}
                    {links?.map((elm) => {
                      return (
                        <div
                          className="sm:w-[190px] w-[49%] h-[180px] rounded-[24px] shadow-lg mt-6"
                          style={
                            direct.linkID === elm?.linkID
                              ? { display: "none" }
                              : null
                          }
                        >
                          <div
                            className="mt-3"
                            style={directMode ? { opacity: "50%" } : null}
                          >
                            <div className="w-[100%] flex justify-center items-center ">
                              <PiDotsSixBold className="text-2xl text-[#EDEDED] cursor-grab" />
                            </div>
                            <div className="w-[100%] flex flex-col justify-center items-center mt-4">
                            {(elm?.linkID == 50 || elm?.linkID == 51 || elm?.linkID == 52 || elm?.linkID == 53 || elm?.linkID == 54
                          || elm?.linkID == 55 || elm?.linkID == 56 || elm?.linkID == 57 || elm?.linkID == 58 || elm?.linkID == 59) ?
                          (
                              <img
                                src={
                                  elm?.image ?  appendBucketPath(elm?.image) : ""
                                }
                                alt=""
                                className="h-[45px] w-[45px] object-cover"
                                style={{
                                  borderRadius: elm?.image ? "10px" : "0px",
                                }}
                              />
                          ) :
                          (
                            <img
                              src={
                                returnIcons(elm?.linkID)
                              }
                              alt=""
                              className="h-[45px] w-[45px] object-cover"
                              style={{
                                borderRadius: elm?.image ? "10px" : "0px",
                              }}
                            />
                        ) }
                              <h2 className="font-[500] text-[15px] mt-2">
                                {t(elm?.name)}
                              </h2>
                            </div>
                          </div>
                          <div className="w-[100%] flex justify-center items-center mt-4">
                            <button
                              className="w-[69px] h-[29px] rounded-[16px] border  text-[9px] font-[500] bg-black text-white"
                              onClick={() =>
                                addtoDirect(
                                  elm?.name,
                                  elm?.linkID,
                                  elm?.value,
                                  uid,
                                  elm?.image
                                )
                              }
                            >
                              {t("Make Direct")}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <DragDropContext
                    onDragEnd={handleDragEnd}
                    // className="w-[100%]  flex justify-start gap-x-6 flex-wrap mt-2"
                  >
                    <Droppable droppableId="droppable" direction="vertical">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="w-[100%]  flex flex-row justify-start gap-x-6 flex-wrap "
                        >
                          {/* allLinks */}
                          {items?.map((elm, index) => (
                            <Draggable
                              key={elm.name}
                              draggableId={elm.name}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="w-[30%]"
                                >
                                  <>
                                    <div className="sm:w-[100%] w-[49%] h-[180px] rounded-[24px] shadow-lg mt-6">
                                      <div className="w-[100%] flex justify-center items-center ">
                                        <PiDotsSixBold className="text-2xl text-[#EDEDED] cursor-grab" />
                                      </div>
                                      <div className="w-[100%] flex flex-col justify-center items-center mt-4">
                                      {(elm?.linkID == 50 || elm?.linkID == 51 || elm?.linkID == 52 || elm?.linkID == 53 || elm?.linkID == 54
                          || elm?.linkID == 55 || elm?.linkID == 56 || elm?.linkID == 57 || elm?.linkID == 58 || elm?.linkID == 59) ?
                          (
                              <img
                                src={
                                  elm?.image ?  appendBucketPath(elm?.image) : ""
                                }
                                alt=""
                                className="h-[45px] w-[45px] object-cover"
                                style={{
                                  borderRadius: elm?.image ? "10px" : "0px",
                                }}
                              />
                          ) :
                          (
                            <img
                              src={
                                returnIcons(elm?.linkID)
                              }
                              alt=""
                              className="h-[45px] w-[45px] object-cover"
                              style={{
                                borderRadius: elm?.image ? "10px" : "0px",
                              }}
                            />
                        ) }
                                        <h2 className="font-[500] text-[15px] mt-2">
                                          {t(elm?.name)}
                                        </h2>
                                      </div>

                                      <div className="w-[100%] flex justify-center items-center mt-4">
                                        <button
                                          className="w-[62px] h-[27px] rounded-[16px] border mr-1 text-[8px] font-[500]"
                                          onClick={() => {
                                            handledeleteModal(),
                                              setteamId(elm?.linkID);
                                          }}
                                        >
                                          {t("Remove Link")}
                                        </button>
                                        <Switch
                                          // size="small"
                                          checked={elm?.shareable}
                                          onChange={() =>
                                            updateLinkShareAble(
                                              uid,
                                              elm?.linkID,
                                              elm?.shareable,
                                              links
                                            )
                                          }
                                          // inputProps={{ 'aria-label': 'controlled' }}
                                          className="ml-1"
                                        />
                                        {/* <button className="w-[62px] h-[27px] rounded-[16px] border ml-1 text-[8px] font-[500] bg-black text-white">
                                  Open Link
                                </button> */}
                                      </div>
                                    </div>
                                  </>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </>
            )}
          </>
        ) : (
          <div className="w-[100%] h-[85%] flex justify-center items-center">
            <p>
              {t("No links to show")}{" "}
              <span
                className="font-[500] underline cursor-pointer"
                onClick={() => handleModal()}
              >
                {t("Add links")}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
