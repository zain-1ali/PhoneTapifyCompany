import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import prsnPlshldr from "../../imgs/prsnPlshldr.png";

import { deleteContactFileDb } from "../../Services";
import { MdOutlineCancel, MdOutlineMail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { RxDropdownMenu } from "react-icons/rx";
import { LuTextQuote } from "react-icons/lu";
import { FaRegFile } from "react-icons/fa";

import { FaExchangeAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";
import csv from "../../imgs/csv.png";
import { TfiDownload } from "react-icons/tfi";
import { FaRegMessage } from "react-icons/fa6";
import DownloadCsv from "../DownloadCsv";
import { useTranslation } from "react-i18next";

const SingleLeadModal = ({ leadModal, handleLeadModal, singleLead }) => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 530,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

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

let [singleLeadState, setSingleLeadState] = useState(singleLead);

useEffect(() => {
  setSingleLeadState(singleLead);
}, [singleLead]);

const deleteFileCallback = () => {
  
  setSingleLeadState(prevState => ({ ...prevState, file: "" }));
};

const deleteContactFile = (id, path) => {
  deleteContactFileDb(id, path, deleteFileCallback);
};
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        open={leadModal}
        onClose={() => handleLeadModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[96%] mt-[1%] w-[100%] overflow-scroll">
            <div className="w-[99%] flex justify-end mt-1">
              <MdOutlineCancel
                className="text-2xl cursor-pointer"
                onClick={() => handleLeadModal()}
              />
            </div>
            <div className="w-[100%] flex justify-center mt-[10px]">
              <div className="w-[75%] flex justify-between items-center">
                <img
                  src={
                    singleLeadState?.contactImage
                      ? singleLeadState?.contactImage
                      : prsnPlshldr
                  }
                  alt=""
                  className="h-[130px] w-[130px] rounded-full object-cover"
                />

                <FaExchangeAlt className="text-[45px]" />

                <img
                  src={
                    singleLeadState?.userImage ? singleLeadState?.userImage : prsnPlshldr
                  }
                  alt=""
                  className="h-[130px] w-[130px] rounded-full object-cover"
                />
              </div>
            </div>

            <div className="w-[100%] flex justify-center mt-[40px]">
              <div className="w-[70%] flex justify-between ">
                <div className=" w-[40%]">
                  <h2 className="font-[400] text-[24px]">{singleLeadState?.name}</h2>
                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <MdOutlineMail />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLeadState?.email}
                    </p>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <IoBriefcaseOutline />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLeadState?.job || "N/A"}
                    </p>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <FiPhone />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLeadState?.phone}
                    </p>
                  </div>
                  {(singleLeadState?.date && singleLeadState?.date!="") &&
                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <CiCalendarDate />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLeadState?.date}
                    </p>
                  </div>
                  }
                  {(singleLeadState?.dropdown && singleLeadState?.dropdown!="") &&
                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <RxDropdownMenu />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLeadState?.dropdown}
                    </p>
                  </div>
                  }
                  {(singleLeadState?.file && singleLeadState?.file!="") &&
                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <FaRegFile />
                    </div>
                    <a 
                      href={`${(singleLeadState?.file && singleLeadState?.file!="") ? appendBucketPath(singleLeadState?.file) : null}`} 
                      target="_blank" 
                      className="font-[500] text-[12px] w-[25%] bg-[#3fb621] ml-2 text-white text-center px-2 py-1 rounded-md"
                      >
                        {(singleLeadState?.file && singleLeadState?.file!="") ? "View" : ""}
                      </a>
                      <a 
                      onClick={() => deleteContactFile(singleLeadState?.id, singleLeadState?.file)}
                      className="font-[500] text-[12px] w-[25%] bg-[red] ml-2 text-white text-center px-2 py-1 rounded-md"
                      >
                        Delete
                      </a>
                  </div>
                  }
                </div>
                <div className=" w-[40%] h-[180px]">
                  <div className="w-[100%] flex justify-center">
                    <h2 className="font-[400] text-[18px]">
                      {singleLeadState ? (
                        <DownloadCsv data={[singleLeadState]} />
                      ) : (
                        t("Export as")
                      )}
                    </h2>
                  </div>
                  {/* <div className="h-[113px] rounded-[18px] border shadow-lg mt-2 flex justify-center flex-col items-center cursor-pointer">
                    <img src={zap} alt="" className="h-[35px] w-[35px]" />
                    <div className="flex text-[14px] font-[500] mt-1">
                      Zapier File <TfiDownload className="text-lg ml-1" />
                    </div>
                  </div> */}

                  <div className="h-[113px] rounded-[18px] border shadow-lg mt-2 flex justify-center flex-col items-center cursor-pointer">
                    <img src={csv} alt="" className="h-[35px] w-[35px]" />
                    <div className="flex text-[14px] font-[500] mt-1">
                      <DownloadCsv data={[singleLeadState]} />{" "}
                      <TfiDownload className="text-lg ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  mt-4 w-[70%] ml-[15%] h-max">
              <div className="w-[6%]">
                <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                  <FaRegMessage />
                </div>
              </div>
              <div className="w-[94%]">
                <p className="text-[#818181] text-[12px] font-[400] ml-2 mt-2">
                  {singleLeadState?.message}
                </p>
              </div>
            </div>
            {(singleLeadState?.short_text && singleLeadState?.short_text!="") &&
            <div className="flex  mt-4 w-[70%] ml-[15%] h-max">
              <div className="w-[6%]">
                <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                  <LuTextQuote />
                </div>
              </div>
              <div className="w-[94%]">
                <p className="text-[#818181] text-[12px] font-[400] ml-2 mt-2">
                  {singleLeadState?.message}
                </p>
              </div>
            </div>
            }
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SingleLeadModal;
