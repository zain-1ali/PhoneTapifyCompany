import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
// import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { MdArrowBackIos } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { deleteContact } from "../../Services";
import { useTranslation } from "react-i18next";

const SelectEditType = ({ editTypeModal, handledEditType, text, tags }) => {
  // --------------------------------------------------Create Single self profile----------------------------------

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: "max-content",
    paddingBottom: "10px",
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

  const { t } = useTranslation();

  return (
    <div>
      <Modal
        open={editTypeModal}
        onClose={() => handledEditType("cancel")}
        aria-labelledby="deleteModal-deleteModal-title"
        aria-describedby="deleteModal-deleteModal-description"
      >
        <Box sx={style2}>
        <div
              className="w-[100px] h-[35px] mt-[10px] ml-[10px] rounded-[36px] bg-[#f7f7f7] flex justify-center items-center cursor-pointer"
              onClick={() => handledEditType("cancel")}
            >
              <MdArrowBackIos style={{ fontSize: "14px" }} />
              <p className="font-inter text-[12px] font-semibold leading-[8px] w-[60%] text-center">
                {t("Go back")}
              </p>
            </div>
          <div className="h-[100%] w-[100%] flex flex-col items-center">
            <p className="text-center font-[500] mt-[30px] w-[90%] ">{text}</p>
            <div className="w-[100%] flex justify-center items-center mt-2">
             
              {

              tags?.map((tag, index) => (
                <div
                  key={index} // Add a unique key for each element
                  className="h-[30px] p-[8px] rounded-full border flex justify-center items-center text-sm ml-[5px] bg-[#3fb621] text-white cursor-pointer"
                  onClick={() => {
                    handledEditType(tag);
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
  );
};

export default SelectEditType;
