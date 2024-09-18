import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
// import {
//   openLinkModal,
//   openLinkEditModal,
//   openLinkUpdateModal,
//   openModal,
//   closeAllModal,
// } from "../Redux/Modalslice";
// import { addLink, changeLinkName, removeLink } from "../Redux/Singlelinkslice";
import { Box } from "@mui/material";
import {
  contactIcons,
  socialIcons,
  media,
  payment,
  more,
  photos,
  Video,
} from "../../assets/ReturnSocialIcons";
import { RxCross2 } from "react-icons/rx";
import { HiBadgeCheck } from "react-icons/hi";
// import Linkeditmodal from "./Linkeditmodal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import LinkupdateModal from "./LinkupdateModal";
// import { setLinkDescription, setLinkHighlight } from "../Redux/UserinfoSlice";
import { useMediaQuery } from "react-responsive";
import { MdAddCircleOutline, MdArrowBackIosNew } from "react-icons/md";
import {
  addFeaturedImg,
  addFeaturedVideo,
  addNewLink,
  removeImage,
  removeVideo,
  renoveLink,
  splitString,
  updateNewLink,
} from "../../Services";
import Mobile from "../Mobile";
import { FaRegTrashAlt } from "react-icons/fa";
import Cropper from "../Cropper";
import { useTranslation } from "react-i18next";
import { FiMinusCircle } from "react-icons/fi";
import CircularProgress from "@mui/material/CircularProgress";

// import { removeLink } from "../Redux/Singlelinkslice";

const SocialLinkModal = ({ modal, handleClose, uid, allProfiles }) => {
  const dispatch = useDispatch();

  // console.log(contactIcons);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const links = useSelector((state) => state.profileInfoSlice.links);
  const featuredImages = useSelector(
    (state) => state.profileInfoSlice.featuredImages
  );
  const featuredVideos = useSelector(
    (state) => state.profileInfoSlice.featuredVideos
  );

  // console.log(links);

  const [photoValue, setPhotoValue] = useState({
    detail: "",
    image: "",
    title: "",
    id: "",
  });

  //--------------------------------------------------------handle video state-----------------------------------------

  const [videoValue, setVideoValue] = useState({
    detail: "",
    image: "",
    title: "",
    id: "",
  });
  let [videoEdit, setVideoEdit] = useState(false);

  let handleVideoEditModal = () => {
    setVideoEdit(!videoEdit);
    setVideoValue({
      detail: "",
      image: "",
      title: "",
      id: "",
    });
    setCustomVideo("");
  };

  const [customVideo, setCustomVideo] = useState("");
  const [customVideoPrw, setCustomVideoPrw] = useState("");

  // console.log(featuredVideos);

  let addAlreadyExistVideo = (link) => {
    // console.log("check", link);
    setCustomVideo("");
    setVideoValue({
      detail: "",
      image: "",
      title: "",
      id: "",
    });
    let addedVideo = featuredVideos?.find((elm) => {
      return elm?.id === link?.id;
    });
    // console.log("my data", addedVideo);
    if (addedVideo) {
      // console.log("work1");
      setVideoValue({
        detail: addedVideo?.detail,
        title: addedVideo?.title,
        id: addedVideo?.id,
        image: link?.image,
      });
      setCustomVideo(appendBucketPath(addedVideo?.videoUrl));
    } else {
      // console.log("work2");
      setVideoValue({ ...link });
    }
  };
  // console.log(videoValue);

  let checkAddedVideo = (linkid) => {
    if (featuredVideos) {
      let ifAdded = featuredVideos?.some((elm) => {
        return elm?.id === linkid;
      });
      return ifAdded;
    } else {
      return false;
    }
  };

  let checkIfVideoAdded = (id) => {
    if (featuredVideos) {
      let ifAdded = featuredVideos?.find((elm) => {
        return elm?.id === id;
      });
      return ifAdded;
    }
  };

  const appendBucketPath = (path) => {
    let url = "";
    if (path !== "") {
      const filterUrl = path.replace("gs://connexcard-8ad69.appspot.com/", "");
      url = `https://firebasestorage.googleapis.com/v0/b/connexcard-8ad69.appspot.com/o/${filterUrl}?alt=media`;
    }
    return url;
  };

  const [customPhoto, setCustomPhoto] = useState("");

  let addAlreadyExistPhoto = (link) => {
    // console.log("check", link);
    setCustomPhoto("");
    setPhotoValue({
      detail: "",
      image: "",
      title: "",
      id: "",
    });
    let addedPhoto = featuredImages.find((elm) => {
      return elm?.id === link?.id;
    });
    // console.log("my data", addedPhoto);
    if (addedPhoto) {
      setPhotoValue({
        detail: addedPhoto?.detail,
        title: addedPhoto?.title,
        id: addedPhoto?.id,
        image: link?.image,
      });
      setCustomPhoto(appendBucketPath(addedPhoto?.imageUrl));
    } else {
      setPhotoValue({ ...link });
    }
  };

  let checkAddedImage = (linkid) => {
    if (featuredImages) {
      let ifAdded = featuredImages?.some((elm) => {
        return elm?.id === linkid;
      });
      return ifAdded;
    } else {
      return false;
    }
  };

  let checkPhotoAdded = (id) => {
    if (featuredImages) {
      let ifAdded = featuredImages?.some((elm) => {
        return elm?.id === id;
      });
      return ifAdded;
    }
  };

  let checkIfPhotoAdded = (id) => {
    if (featuredImages) {
      let ifAdded = featuredImages?.find((elm) => {
        return elm?.id === id;
      });
      return ifAdded;
    }
  };

  let [linkEdit, setLinkEdit] = useState(false);
  let [photoEdit, setPhotoEdit] = useState(false);

  let [linkInfo, setLinkInfo] = useState({});

  let [linkValue, setLinkValue] = useState({
    value: "",
    shareable: true,
  });

  let handleLinkEditModal = () => {
    setLinkEdit(!linkEdit);
    setLinkInfo({});
    setLinkValue({ value: "", shareable: true });
    setcustomImg("");
  };

  let handlePhotoEditModal = () => {
    setPhotoEdit(!photoEdit);
    setPhotoValue({
      detail: "",
      image: "",
      title: "",
      id: "",
    });
    setCustomPhoto("");
  };

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: linkEdit ? 900 : 1000,
    height: linkEdit ? 550 : 600,
    bgcolor: "white",
    borderRadius: "18px",
    // overflow: 'auto',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: linkModal ? "30px" : "2px",
    p: "30px",
  };
  let checkAdded = (linkid) => {
    if (links) {
      let ifAdded = links?.some((elm) => {
        return parseInt(elm?.linkID) === linkid;
      });
      return ifAdded;
    }
  };

  let checkIfCstmAdded = (linkid) => {
    if (links) {
      let ifAdded = links?.find((elm) => {
        return elm?.linkID === linkid;
      });
      return ifAdded;
    }
  };

  const removeBaseUrl = (base, value) => {
    if (value?.includes(base)) {
      const baseLength = base?.length;
      const valueLength = value?.length;
      const returnValue = value.slice(baseLength, valueLength);
      return returnValue;
    } else {
      return value;
    }
  };

  let addAlreadyExist = (link, index) => {
    setLinkValue({ value: "", shareable: true });
    let addedLink = links.find((elm) => {
      return elm?.linkID === link?.linkID;
    });

    if (addedLink) {
      // console.log("true");
      setLinkValue({
        value:
          addedLink?.linkID === 50
            ? addedLink?.value
            : removeBaseUrl(link?.baseUrl, addedLink?.value),
        shareable: addedLink?.shareable,
        index,
      });
      setLinkInfo({
        name: addedLink?.name,
        image: addedLink?.image ? addedLink?.image : link?.img,
        linkID: link?.linkID,
        placeholder: link?.placeholder,
        baseUrl: link?.baseUrl,
      });
    } else {
      // console.log("false");
      setLinkInfo({ ...link, image: link?.img });
    }
  };

  // console.log(photoValue);

  let [customImg, setcustomImg] = useState("");

  let handleImageChange = (result) => {
    setLinkInfo({ ...linkInfo, image: result });
  };

  let handlePhotoChange = (result) => {
    setCustomPhoto(result);
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
  let [logoKey, setLogoKey] = useState(0);
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

  const handleGetVideo = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setCustomVideoPrw(videoURL);
      setCustomVideo(file);
    }
  }, []);

  // const handleGetVideo = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const videoURL = URL.createObjectURL(file);
  //     setCustomVideoPrw(videoURL);
  //     setCustomVideo(file);
  //   }
  // };

  // console.log(linkInfo?.image);

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

  const ifCompany = (uid) => {
    return uid === companyId ? true : false;
  };
  // console.log(ifCompany());

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { t } = useTranslation();

  const ifCustom = (id) => {
    if (id === 50 || id === 51 || id === 52 || id === 53 || 
      id === 54 || id === 55 || id === 56 || id === 57 || id === 58 || id === 59) {
      return true;
    } else {
      return false;
    }
  };
  const mystring = "";
  // console.log(mystring?.slice(0, 5));

  const [loading, setloading] = useState(false);

  const handleTitleChange = useCallback(
    (event) => {
      setVideoValue((prevValue) => ({
        ...prevValue,
        title: event.target.value,
      }));
    },
    [videoValue.title]
  );
  const videoRef = useRef(null);

  // --------------------video component --------------------
  const VideoComponent = ({ customVideo }) => {
    return (
      <video
        ref={videoRef}
        src={
          typeof customVideo === "object"
            ? URL.createObjectURL(customVideo)
            : customVideo
        }
        controls
        className="h-[100%] w-[100%] rounded-xl"
      />
    );
  };

  // memoizing video component so that it prevent blincking/re-rendering when user type
  const memoizedVideo = useMemo(() => {
    return customVideo ? <VideoComponent customVideo={customVideo} /> : null;
  }, [customVideo]);

  // console.log(photoValue);
  return (
    <>
      <Modal
        open={modal}
        onClose={() => {
          //   dispatch(closeAllModal()),
          //     dispatch(removeLink()),
          //     dispatch(setLinkHighlight(false));
          handleClose();
          setLinkEdit(false);
          setPhotoEdit(false);
          setVideoEdit(false);
          setLinkInfo({});
          setPhotoValue({
            detail: "",
            image: "",
            title: "",
            id: "",
          });

          setCustomPhoto("");
          setcustomImg("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="overflow-y-scroll h-[100%] scrollbar-hide">
            <div className="w-[100%] flex justify-between ">
              {linkEdit || photoEdit || videoEdit ? (
                <div className="w-[60%] flex justify-between items-center">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() =>
                      linkEdit
                        ? handleLinkEditModal()
                        : videoEdit
                        ? handleVideoEditModal()
                        : handlePhotoEditModal()
                    }
                  >
                    <MdArrowBackIosNew className="text-xl" />
                    <p className="ml-1 text-lg">{t("Back")}</p>
                  </div>
                  {(checkAdded(linkInfo?.linkID) ||
                    checkPhotoAdded(photoValue?.id) ||
                    checkAddedVideo(videoValue?.id)) && (
                    <FaRegTrashAlt
                      className="text-2xl hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        linkEdit
                          ? renoveLink(
                              {
                                image: "",
                                linkID: linkInfo?.linkID,
                                name: linkInfo?.name,
                                value: linkValue?.value,
                                shareable: linkValue?.shareable,
                              },
                              uid,
                              links,
                              () => setLinkEdit(false),
                              ifCompany,
                              allProfiles
                            )
                          : photoEdit
                          ? removeImage(uid, featuredImages, photoValue, () =>
                              setPhotoEdit(false)
                            )
                          : videoEdit
                          ? removeVideo(uid, featuredVideos, videoValue, () =>
                              setVideoEdit(false)
                            )
                          : null;
                      }}
                    />
                  )}
                </div>
              ) : (
                <div></div>
              )}
              <div
                className="cursor-pointer"
                onClick={() => {
                  handleClose();
                  setLinkEdit(false);
                  setPhotoEdit(false);
                  setVideoEdit(false);
                  setLinkInfo({});
                  //   dispatch(closeAllModal()),
                  //     dispatch(removeLink()),
                  //     dispatch(setLinkHighlight(false));
                }}
              >
                <RxCross2 className="text-2xl" />
              </div>
            </div>

            {/* { 
    name: "Skype",
    title: "Skype",
    img: skype,
    placeholder: "Skype*",
    linkID: 12,
  }, */}

            {linkEdit ? (
              <div className="w-[100%] h-[93%] flex">
                {/* --------------------------------------------croper for logo image------------------------------------------------  */}
                <Cropper
                  cropModal={cropLogoModal}
                  handleclosecropper={handlecloselogocropper}
                  theimg={logoimg}
                  myimg={mylogolimg}
                  setmyimg={setmylogolimg}
                  setcrop={setCroplogo}
                  crop={croplogo}
                  aspect={1 / 1}
                  setReduxState={handleImageChange}
                  isCircle={false}
                  isNotRedux={true}
                />
                <div className="w-[64%] h-[100%]">
                  <div className="mt-10 w-[90%] flex justify-center">
                    <div className="h-[120px] w-[120px] relative ">
                      <img
                        src={linkInfo?.image}
                        alt=""
                        className="h-[120px] w-[120px] rounded-3xl object-cover"
                      />
                      {linkInfo?.linkID === 50 ||
                    linkInfo?.linkID === 51 ||
                    linkInfo?.linkID === 52 ||
                    linkInfo?.linkID === 53 ||
                    linkInfo?.linkID === 54 ||
                    linkInfo?.linkID === 55 ||
                    linkInfo?.linkID === 56 ||
                    linkInfo?.linkID === 57 ||
                    linkInfo?.linkID === 58 ||
                    linkInfo?.linkID === 59  ? (
                        <label
                          for="qrimg"
                          class="absolute right-[-2px] top-[-2px] cursor-pointer"
                        >
                          <MdAddCircleOutline className="text-2xl" />
                          <input
                            type="file"
                            accept="image/*"
                            name="qrimg"
                            id="qrimg"
                            className="opacity-0 w-[0px] h-[0px]"
                            onChange={handleLogoImageChange}
                            key={logoKey}
                          />
                        </label>
                      ) : null}
                    </div>
                  </div>

                  {/* <div className="mt-8">
                    <h2 className="text-sm font-medium">Link Title*</h2>
                    <input
                      type="text"
                      className="mt-2 outline-none border-none w-[500px]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                    />
                  </div> */}

                  <div className="mt-8">
                    <h2 className="text-sm font-medium ">
                      {t(linkInfo?.placeholder)}
                    </h2>
                    <input
                      type={
                        linkInfo?.linkID === 6 || linkInfo?.linkID === 10
                          ? "number"
                          : "text"
                      }
                      className="mt-2 outline-none border-none w-[90%]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                      onChange={(e) =>
                        setLinkValue({ ...linkValue, value: e.target.value })
                      }
                      value={linkValue?.value}
                    />
                    {
                    linkInfo?.linkID === 50 ||
                    linkInfo?.linkID === 51 ||
                    linkInfo?.linkID === 52 ||
                    linkInfo?.linkID === 53 ||
                    linkInfo?.linkID === 54 ||
                    linkInfo?.linkID === 55 ||
                    linkInfo?.linkID === 56 ||
                    linkInfo?.linkID === 57 ||
                    linkInfo?.linkID === 58 ||
                    linkInfo?.linkID === 59  ? (
                      <>
                        <h2 className="text-sm font-medium mt-4">Title*</h2>
                        <input
                          type="text"
                          className="mt-2 outline-none border-none w-[90%]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                          onChange={(e) =>
                            setLinkInfo({
                              ...linkInfo,
                              name: e.target.value,
                            })
                          }
                          value={linkInfo?.name}
                        />
                      </>
                    ) : null}

                    <div className="w-[90%] flex justify-center items-center mt-5">
                      <div
                        className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center mr-1 bg-[#f0f0f0]"
                        onClick={() => handleLinkEditModal()}
                      >
                        {t("Cancel")}
                      </div>
                      {checkAdded(linkInfo?.linkID) ? (
                        <>
                          <div
                            className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-1 bg-[#3fb621] text-white"
                            onClick={() =>
                              updateNewLink(
                                {
                                  image: linkInfo?.image,
                                  linkID: linkInfo?.linkID,
                                  name: linkInfo?.name,
                                  value: linkInfo?.baseUrl + linkValue?.value,
                                  shareable: linkValue?.shareable,
                                },
                                uid,
                                links,
                                () => setLinkEdit(false),
                                ifCompany,
                                allProfiles,
                                t("Link updated successfully")
                              )
                            }
                          >
                            {t("Update")}
                          </div>

                          {/* <div
                            className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-2 border border-red-500 text-red-500"
                            onClick={() =>
                              renoveLink(
                                {
                                  image: "",
                                  linkID: linkInfo?.linkID,
                                  name: linkInfo?.name,
                                  value: linkValue?.value,
                                  shareable: linkValue?.shareable,
                                },
                                uid,
                                links,
                                () => setLinkEdit(false)
                              )
                            }
                          >
                            Delete
                          </div> */}
                        </>
                      ) : (
                        <div
                          className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-1 bg-black text-white"
                          onClick={() => {
                            if (linkInfo?.linkID === 20 || linkInfo?.linkID === 11) {
                              if (isValidEmail(linkValue?.value)) {
                                addNewLink(
                                  {
                                    image: linkInfo?.image,
                                    linkID: linkInfo?.linkID,
                                    name: linkInfo?.name,
                                    value: linkInfo?.baseUrl + linkValue?.value,
                                    shareable: linkValue?.shareable,
                                  },
                                  uid,
                                  links,
                                  handleLinkEditModal,
                                  ifCompany,
                                  allProfiles,
                                  t("Link added successfully")
                                );
                              } else {
                                toast.error("please enter valid email");
                              }
                            } else {
                              addNewLink(
                                {
                                  image: linkInfo?.image,
                                  linkID: linkInfo?.linkID,
                                  name: linkInfo?.name,
                                  value: linkInfo?.baseUrl + linkValue?.value,
                                  shareable: linkValue?.shareable,
                                },
                                uid,
                                links,
                                handleLinkEditModal,
                                ifCompany,
                                allProfiles,
                                t("Link added successfully")
                              );
                            }
                          }}
                        >
                          {t("Add")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[34%] h-[100%]">
                  <Mobile
                    linkInfo={linkInfo}
                    ifAdded={checkAdded(linkInfo?.linkID)}
                  />
                </div>
              </div>
            ) : photoEdit ? (
              <div className="w-[100%] h-[93%] flex">
                {/* --------------------------------------------croper for logo image------------------------------------------------  */}
                <Cropper
                  cropModal={cropLogoModal}
                  handleclosecropper={handlecloselogocropper}
                  theimg={logoimg}
                  myimg={mylogolimg}
                  setmyimg={setmylogolimg}
                  setcrop={setCroplogo}
                  crop={croplogo}
                  aspect={1 / 1}
                  setReduxState={handlePhotoChange}
                  isCircle={false}
                  isNotRedux={true}
                />
                <div className="w-[64%] h-[100%]">
                  <div className="mt-5 w-[90%] flex justify-center">
                    <div className="h-[150px] w-[150px] relative ">
                      <img
                        src={customPhoto ? customPhoto : photoValue?.image}
                        alt=""
                        className="h-[150px] w-[150px] rounded-3xl object-cover shadow-md"
                      />
                      {customPhoto ? (
                        <FiMinusCircle
                          style={{ fontSize: "22px" }}
                          className="absolute right-[-5px] cursor-pointer top-0 text-red-500"
                          onClick={() => {
                            // dispatch(setLogoUrl("")), dispatch(setOrgLogo(""));
                            setCustomPhoto("");
                          }}
                        />
                      ) : (
                        <label
                          for="qrimg"
                          class="absolute right-[-5px] cursor-pointer top-0"
                        >
                          <MdAddCircleOutline className="text-2xl" />
                          <input
                            type="file"
                            name="qrimg"
                            id="qrimg"
                            className="opacity-0 w-[0px] h-[0px]"
                            onChange={handleLogoImageChange}
                            key={logoKey}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  {/* <div className="mt-8">
                    <h2 className="text-sm font-medium">Link Title*</h2>
                    <input
                      type="text"
                      className="mt-2 outline-none border-none w-[500px]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                    />
                  </div> */}
                  <div className="mt-6">
                    <h2 className="text-sm font-medium ">
                      {/* {t(linkInfo?.placeholder)} */}
                      Title*
                    </h2>
                    <input
                      type={"text"}
                      className="mt-2 outline-none border-none w-[90%]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                      onChange={(e) =>
                        setPhotoValue({
                          ...photoValue,
                          title: e.target.value,
                        })
                      }
                      value={photoValue?.title}
                    />

                    <>
                      <h2 className="text-sm font-medium mt-4">Description</h2>
                      <textarea
                        onChange={(e) =>
                          setPhotoValue({
                            ...photoValue,
                            detail: e.target.value,
                          })
                        }
                        value={photoValue?.detail}
                        className="mt-2 outline-none border-none w-[90%]  max-h-[100px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                      ></textarea>
                      {/* <input type="text" /> */}
                    </>

                    <div className="w-[90%] flex justify-center items-center mt-5">
                      <div
                        className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center mr-1 bg-[#f0f0f0]"
                        onClick={() => handlePhotoEditModal()}
                      >
                        {t("Cancel")}
                      </div>

                      <div
                        className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-1 bg-black text-white"
                        onClick={() => {
                          addFeaturedImg(
                            uid,
                            {
                              detail: photoValue?.detail,
                              image: customPhoto,
                              title: photoValue?.title,
                              id: photoValue?.id,
                            },
                            featuredImages,
                            checkAddedImage(photoValue?.id),
                            handlePhotoEditModal
                          );
                        }}
                      >
                        {t("Add")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[34%] h-[100%]">
                  <Mobile
                    linkInfo={linkInfo}
                    ifAdded={checkAdded(linkInfo?.linkID)}
                    photoValue={photoValue}
                    checkPhotoAdded={checkPhotoAdded(photoValue?.id)}
                    customPhoto={customPhoto}
                  />
                </div>
              </div>
            ) : videoEdit ? (
              <div className="w-[100%] h-[93%] flex">
                {/* --------------------------------------------croper for logo image------------------------------------------------  */}

                <div className="w-[64%] h-[100%]">
                  <div className="mt-5 w-[90%] flex justify-center">
                    <div className="h-[150px] w-[60%] relative border flex justify-center items-center rounded-xl">
                      {customVideo ? (
                        // <video
                        //   ref={videoRef}
                        //   src={
                        //     typeof customVideo === "object"
                        //       ? URL.createObjectURL(customVideo)
                        //       : customVideo
                        //   }
                        //   controls
                        //   className="h-[100%] w-[100%] rounded-xl"
                        // />
                        memoizedVideo
                      ) : (
                        <img
                          src={videoValue?.image}
                          alt=""
                          className="h-[100px] w-[100px] rounded-3xl object-cover"
                        />
                      )}
                      {customVideo ? (
                        <FiMinusCircle
                          style={{ fontSize: "22px" }}
                          className="absolute right-[-7px] cursor-pointer top-[-6px] text-red-500"
                          onClick={() => {
                            setCustomVideo("");
                          }}
                        />
                      ) : (
                        <label
                          for="qrimg"
                          class="absolute right-[-7px] cursor-pointer top-[-6px]"
                        >
                          <MdAddCircleOutline className="text-2xl" />
                          <input
                            type="file"
                            name="qrimg"
                            id="qrimg"
                            className="opacity-0 w-[0px] h-[0px]"
                            accept="video/*"
                            onChange={handleGetVideo}
                            key={logoKey}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  {/* <div className="mt-8">
                    <h2 className="text-sm font-medium">Link Title*</h2>
                    <input
                      type="text"
                      className="mt-2 outline-none border-none w-[500px]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                    />
                  </div> */}
                  <div className="mt-6">
                    <h2 className="text-sm font-medium ">
                      {/* {t(linkInfo?.placeholder)} */}
                      Title*
                    </h2>
                    <input
                      type={"text"}
                      className="mt-2 outline-none border-none w-[90%]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                      onChange={handleTitleChange}
                      value={videoValue?.title}
                    />

                    <>
                      <h2 className="text-sm font-medium mt-4">Description</h2>
                      <textarea
                        onChange={(e) =>
                          setVideoValue({
                            ...videoValue,
                            detail: e.target.value,
                          })
                        }
                        value={videoValue?.detail}
                        className="mt-2 outline-none border-none w-[90%]  max-h-[100px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                      ></textarea>
                      {/* <input type="text" /> */}
                    </>

                    <div className="w-[90%] flex justify-center items-center mt-5">
                      <div
                        className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center mr-1 bg-[#f0f0f0]"
                        onClick={() => handleVideoEditModal()}
                      >
                        {t("Cancel")}
                      </div>

                      <div
                        className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-1 bg-black text-white"
                        onClick={() => {
                          addFeaturedVideo(
                            uid,
                            {
                              detail: videoValue?.detail,
                              video: customVideo,
                              title: videoValue?.title,
                              id: videoValue?.id,
                            },
                            featuredVideos,
                            checkAddedVideo(videoValue?.id),
                            handleVideoEditModal,
                            setloading
                          );
                        }}
                      >
                        {loading ? (
                          <div
                            className="text-[white]"
                            style={{
                              color: "#ffffff",
                              // backgroundColor: "#ffffff",
                            }}
                          >
                            {/* <CircularProgress color="inherit" size="small" /> */}
                            Adding...
                          </div>
                        ) : checkAddedVideo(videoValue?.id) ? (
                          t("Update")
                        ) : (
                          t("Add")
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[34%] h-[100%]">
                  <Mobile
                    linkInfo={linkInfo}
                    ifAdded={checkAdded(linkInfo?.linkID)}
                    photoValue={photoValue}
                    checkPhotoAdded={checkPhotoAdded(photoValue?.id)}
                    customPhoto={customPhoto}
                    videoValue={videoValue}
                    checkAddedVideo={checkAddedVideo(videoValue?.id)}
                    customVideo={customVideo}
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-medium">{t("Add Content")}</h2>
                <p className="text-sm mt-2 text-[#4F4F4F]">
                  {t(
                    "Select from our wide variety of links and contact info below"
                  )}
                </p>
                <div className="mt-10">
                  <h2 className="font-medium text-[#4F4F4F]">{t("Contact")}</h2>
                  <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-4 ">
                    {/* flex justify-around flex-wrap */}
                    {contactIcons.map((elm, i) => {
                      return (
                        <div
                          className=" h-[70px] shadow-sm w-[270px] rounded-xl  bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5  relative"
                          onClick={() => {
                            handleLinkEditModal(), addAlreadyExist(elm, i);
                          }}
                          // onClick={
                          //   checkAdded(elm?.name)
                          //     ? () => {
                          //         addlinkname(elm?.name),
                          //           dispatch(openLinkUpdateModal()),
                          //           dispatch(addLink(elm));
                          //       }
                          //     : () => {
                          //         dispatch(openLinkEditModal()),
                          //           dispatch(addLink(elm));
                          //       }
                          // }
                        >
                          {checkAdded(elm?.linkID) && (
                            <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                          )}
                          <div className="flex justify-between items-center w-[100%]">
                            <div className="flex h-[100%] items-center">
                              <img
                                src={elm?.img}
                                className="h-[45px] w-[45px] "
                              />
                              <p className="text-sm font-medium ml-[11px]">
                                {t(elm?.name)}
                              </p>
                            </div>
                            <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                              +
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ------------------------------------------Social icons------------------------------------  */}

                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">
                      {t("Social")}
                    </h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {socialIcons.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.name)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={elm.img}
                                  className="h-[45px] w-[45px] "
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {elm.name}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ------------------------------------------Music icons------------------------------------  */}

                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">
                      {t("Multimedia")}
                    </h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {media?.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.title)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={elm.img}
                                  className="h-[45px] w-[45px]"
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {elm.name}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ------------------------------------------Payment icons------------------------------------  */}
                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">
                      {t("Payment")}
                    </h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {payment?.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.title)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={elm.img}
                                  className="h-[45px] w-[45px] "
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {elm.name}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ------------------------------------------More icons------------------------------------  */}
                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">{t("More")}</h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {more?.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.title)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={
                                    ifCustom(elm?.linkID) &&
                                    checkAdded(elm?.linkID) &&
                                    checkIfCstmAdded(elm?.linkID)?.image
                                      ? checkIfCstmAdded(elm?.linkID)?.image
                                      : elm.img
                                  }
                                  className="h-[45px] w-[45px] rounded-lg object-cover"
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {ifCustom(elm?.linkID) &&
                                  checkAdded(elm?.linkID) &&
                                  checkIfCstmAdded(elm?.linkID)?.name
                                    ? splitString(
                                        t(checkIfCstmAdded(elm?.linkID)?.name),
                                        33
                                      )
                                    : t(elm.name)}

                                  {/* {elm.name} */}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ------------------------------------------Photos icons------------------------------------  */}
                  {/* <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">
                      {t("Photos")}
                    </h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      
                      {photos?.map((elm) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handlePhotoEditModal(), addAlreadyExistPhoto(elm);
                            }}
                          >
                            {checkPhotoAdded(elm?.id) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={
                                    checkPhotoAdded(elm?.id) &&
                                    appendBucketPath(
                                      checkIfPhotoAdded(elm?.id)?.imageUrl
                                    )
                                      ? appendBucketPath(
                                          checkIfPhotoAdded(elm?.id)?.imageUrl
                                        )
                                      : elm.image
                                  }
                                  className="h-[45px] w-[45px] rounded-lg object-cover"
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {checkPhotoAdded(elm?.id) &&
                                  checkIfPhotoAdded(elm?.id)?.title
                                    ? splitString(
                                        t(checkIfPhotoAdded(elm?.id)?.title),
                                        33
                                      )
                                    : t(elm.title)}

                                 {elm.name}  // always comment
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div> */}

                  {/* ------------------------------------------video icons------------------------------------  */}
                  {/* <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">{t("Video")}</h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                       flex justify-around flex-wrap // always comment
                      {Video?.map((elm) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleVideoEditModal(), addAlreadyExistVideo(elm);
                            }}
                          >
                            {checkAddedVideo(elm?.id) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={elm.image}
                                  className="h-[45px] w-[45px] rounded-lg "
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {checkAddedVideo(elm?.id) &&
                                  checkIfVideoAdded(elm?.id)?.title
                                    ? splitString(
                                        checkIfVideoAdded(elm?.id)?.title,
                                        33
                                      )
                                    : t(elm.title)}

                                   {elm.name} // always comment
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div> */}
                </div>
              </>
            )}
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={1000}
            theme="colored"
            hideProgressBar
          />
        </Box>
      </Modal>
    </>
  );
};

export default SocialLinkModal;
