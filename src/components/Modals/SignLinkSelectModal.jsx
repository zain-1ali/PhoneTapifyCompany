import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { BiSearchAlt } from "react-icons/bi";
import prsnPlshldr from "../../imgs/prsnPlshldr.png";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import { returnIconsByArray } from "../../assets/ReturnSocialIcons";
import { updateSignLinks } from "../../Services";

const SignLinkSelectModal = ({
  userProfile,
  linkSelectModal,
  handleCloseLinkModal,
  signIndex,
}) => {
  const { t } = useTranslation();

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 400,
    bgcolor: "white",
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
  };

  const [filtered, setFiltered] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const result = userProfile?.links?.filter((link) =>
      link?.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result || []);
  }, [search, userProfile?.links]);

  useEffect(() => {
    if (userProfile?.signatureLinkIds && userProfile?.links) {
      const signLinks = userProfile.signatureLinkIds[signIndex]?.map((linkId) =>
        userProfile.links.find((link) => link.linkID === linkId)
      ).filter(Boolean); // Filter out any undefined links

      setSelectedLinks(signLinks || []);
    }
  }, [userProfile, signIndex]);

  const addRemoveLinks = (link) => {
    const exists = selectedLinks.find((el) => el.linkID === link.linkID);

    if (!exists && selectedLinks.length < 4) {
      setSelectedLinks((prev) => [...prev, link]);
    } else if (exists) {
      setSelectedLinks((prev) => prev.filter((elm) => elm.linkID !== link.linkID));
    } else {
      toast.error("You can select a maximum of four links.");
    }
  };

  const updateSelectedLinks = () => {
    if (userProfile?.id) {
      updateSignLinks(userProfile.id, selectedLinks, signIndex, callbackFunction);
    } else {
      callbackFunction();
    }
  };

  const callbackFunction = () => {
    handleCloseLinkModal();
  };

  const ifAdded = (link) => selectedLinks.some((el) => el.linkID === link.linkID);

  return (
    <div>
      <Modal
        open={linkSelectModal}
        onClose={handleCloseLinkModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%]">
            <div className="w-[100%] flex justify-center mt-4">
              <div className="sm:w-[80%] w-[55%] sm:h-[45px] h-[70%] flex items-center rounded-[36px] bg-white shadow-lg border">
                <input
                  type="text"
                  className="h-[100%] sm:w-[88%] w-[70px] outline-none rounded-[36px] sm:pl-[10px] pl-[0px] ml-2 sm:text[20px] text[11px]"
                  placeholder={t("Search")}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <BiSearchAlt className="text-[22px] text-[#9B9B9B] mr-2" />
              </div>
            </div>
            <div className="h-[68%] w-[100%] flex justify-center items-center">
              <div className="h-[85%] w-[90%]" style={{ overflowY: "scroll" }}>
                {filtered?.map((elm) => (
                  <div
                    key={elm.linkID}
                    className="h-[50px] w-[100%] mt-2 flex justify-between cursor-pointer hover:bg-slate-100 rounded-md"
                  >
                    <div className="h-[100%] w-[250px] flex items-center">
                      <div className="h-[40px] w-[25%] ml-2">
                        {
                          (elm?.linkID === 50 || elm?.linkID === 51 || elm?.linkID === 52 || elm?.linkID === 53 || elm?.linkID === 54
                            || elm?.linkID === 55 || elm?.linkID === 56 || elm?.linkID === 57 || elm?.linkID === 58 || elm?.linkID === 59) ?
                            (
                              <img
                                src={elm?.image ? elm?.image : returnIconsByArray("Website 1")}
                                alt=""
                                className="h-[40px] w-[40px] rounded-full"
                              />
                            )
                            :
                            (
                              <img
                                src={returnIconsByArray(elm?.name) ? returnIconsByArray(elm?.name) : returnIconsByArray("Website 1")}
                                alt=""
                                className="h-[40px] w-[40px] rounded-full"
                              />
                            )
                        }
                      </div>
                      <p className="mr-3 w-[70%]">{elm?.name}</p>
                    </div>
                    <div className="h-[100%] w-[50px] flex justify-center items-center">
                      <Checkbox
                        checked={ifAdded(elm)}
                        onChange={() => addRemoveLinks(elm)}
                        disabled={!ifAdded(elm) && selectedLinks.length >= 4}
                      />
                    </div>
                  </div>
                ))}
                {
                  filtered?.length == 0 && (
                    <p className="text-center mt-[20%]">No link to show</p>
                  )
                }
              </div>
            </div>
            <div className="w-[100%] h-[45px] flex justify-evenly items-center">
              <button
                className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                onClick={handleCloseLinkModal}
              >
                {t("Cancel")}
              </button>
              <button
                className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                onClick={() => {
                  if (selectedLinks.length <= 4) {
                    
                    updateSelectedLinks(); 
                  } else {
                    toast.error("You can select a maximum of four links.");
                  }
                }}
              >
                {t("Select")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer position="bottom-left" autoClose={1000} theme="colored" hideProgressBar />
    </div>
  );
};

export default SignLinkSelectModal;
