import { Box, Modal } from "@mui/material";
import { push, ref, update } from "firebase/database";
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

import { BsFillPeopleFill } from "react-icons/bs";
// import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import { createNewCard } from "../../Services";
import { useTranslation } from "react-i18next";

const CreateNewCard = ({ modal, handleModal, companyProfile }) => {
  const { t } = useTranslation();
  // --------------------------------------------------Create Single self profile----------------------------------

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let conexParent = localStorage.getItem("conexParent");

  // pro version section
  let [isSubscribe, setIsSubscribe] = useState(false);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [isMonth, setIsMonth] = useState(false);
  const [isYear, setIsYear] = useState(false);

  const getGetFirstDate = (date) => {
    setIsMonth(false);
    setIsYear(false);
    // Step 1: Convert the date string to a Date object
    let dateObject = new Date(date);

    // Step 2: Get the timestamp in milliseconds
    let timestampInMilliseconds = dateObject.getTime();

    // Step 3: Convert milliseconds to seconds
    let timestampInSeconds = Math.floor(timestampInMilliseconds / 1000);
    setFirstDate(timestampInSeconds);
  };

  const getGetLastDate = (date) => {
    setIsMonth(false);
    setIsYear(false);
    // Step 1: Convert the date string to a Date object
    let dateObject = new Date(date);

    // Step 2: Get the timestamp in milliseconds
    let timestampInMilliseconds = dateObject.getTime();

    // Step 3: Convert milliseconds to seconds
    let timestampInSeconds = Math.floor(timestampInMilliseconds / 1000);
    setSecondDate(timestampInSeconds);
  };

  const addMonthly = () => {
    const oneMonthAfter = new Date();
    oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
    setSecondDate(Math.floor(oneMonthAfter.getTime() / 1000));
    setFirstDate(Math.floor(Date.now() / 1000));
    setIsMonth(true);
    setIsYear(false);
  };

  console.log(firstDate);

  console.log(secondDate);

  const addYearly = () => {
    setIsMonth(false);
    setIsYear(true);
    const oneYearAfter = new Date();
    oneYearAfter.setFullYear(oneYearAfter.getFullYear() + 1);
    setSecondDate(Math.floor(oneYearAfter.getTime() / 1000));
    setFirstDate(Math.floor(Date.now() / 1000));
  };

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: isSubscribe ? 430 : 350,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };
  let callBack = () => {
    setData({
      name: "",
      email: "",
      password: "",
    });
    setFirstDate(null);
    setSecondDate(null);
    handleModal();
  };
  return (
    <div>
      <Modal
        open={modal}
        onClose={() => handleModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="w-[100%] h-[100%] flex flex-col justify-evenly items-center">
            {isSubscribe ? (
              <div className="h-[100%] w-[100%]">
                <p className="text-center font-[500] mt-[20px]">
                  Select subscription plan
                </p>
                <div className="w-[100%] flex flex-col justify-center items-center mt-2 gap-3">
                  <div
                    className="h-[50px] w-[90%] rounded-full border flex justify-center items-center text-sm mr-[5px] cursor-pointer bg-black text-white font-[500] relative"
                    onClick={() => addMonthly()}
                  >
                    {isMonth && (
                      <FaRegCircleCheck className="text-green-500 absolute top-0 right-0 text-xl" />
                    )}
                    Monthly
                  </div>

                  <div
                    className="h-[50px] w-[90%] rounded-full border flex justify-center items-center text-sm mr-[5px] cursor-pointer bg-black text-white font-[500] relative"
                    onClick={() => addYearly()}
                  >
                    {isYear && (
                      <FaRegCircleCheck className="text-green-500 absolute top-0 right-0 text-xl" />
                    )}
                    Yearly
                  </div>
                </div>

                <p className="text-center font-[500] mt-[20px]">
                  Or add manually
                </p>

                <div className="w-[100%] flex flex-col justify-center items-center  gap-4">
                  <div className="w-[90%]">
                    <p className="text-xs">Start Date:</p>
                    <div className="h-[50px] w-[100%] rounded-full border flex justify-center items-center text-sm mr-[5px] cursor-pointer  font-[500]">
                      <input
                        type="date"
                        className="w-[87%]"
                        onChange={(e) => getGetFirstDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-[90%]">
                    <p className="text-xs">End Date:</p>
                    <div className="h-[50px] w-[100%] rounded-full border flex justify-center items-center text-sm mr-[5px] cursor-pointer  font-[500]">
                      <input
                        type="date"
                        className="w-[87%]"
                        onChange={(e) => getGetLastDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="w-[100%] flex flex-col justify-center items-center mt-4 gap-3">
              <div
                className="h-[50px] w-[90%] rounded-full border flex justify-center items-center text-sm mr-[5px] cursor-pointer bg-black text-white font-[500]"
                onClick={() =>
                  AddSubscription(
                    firstDate,
                    secondDate,
                    id,
                    handlesubscribeModal
                  )
                }
              >
                Update
              </div>
            </div> */}
                <div className="w-[100%] h-[45px] flex justify-evenly items-center mt-3">
                  <button
                    className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                    onClick={() => {
                      callBack(), setIsSubscribe(false);
                    }}
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                    onClick={() =>
                      createNewCard(
                        { ...data, firstDate, secondDate },
                        callBack,
                        conexParent != "superAdmin"
                          ? Object.values(companyProfile)?.[0]
                          : ""
                      )
                    }
                  >
                    {t("Create")}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-center font-medium text-lg">
                  {t("Create new card")}
                </h2>
                <div className="w-[90%] h-[80%] flex flex-col justify-around">
                  <input
                    type="text"
                    className="w-[100%] h-[45px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
                    placeholder={`${t("Name")}*`}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data?.name}
                  />

                  <input
                    type="text"
                    className="w-[100%] h-[45px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
                    placeholder={`${t("Email")}*`}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data?.email}
                  />

                  <input
                    type="text"
                    className="w-[100%] h-[45px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
                    placeholder={`${t("Password")}*`}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    value={data?.password}
                  />
                  <div className="w-[100%] h-[45px] flex justify-evenly items-center">
                    <button
                      className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                      onClick={() => {
                        callBack(), setIsSubscribe(false);
                      }}
                    >
                      {t("Cancel")}
                    </button>
                    {conexParent != "superAdmin" ? (
                      <button
                        className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                        onClick={() =>
                          createNewCard(
                            data,
                            callBack,
                            conexParent != "superAdmin"
                              ? Object.values(companyProfile)?.[0]
                              : ""
                          )
                        }
                      >
                        {t("Create")}
                      </button>
                    ) : (
                      <button
                        className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                        onClick={() =>
                          // createNewCard(
                          //   data,
                          //   callBack,
                          //   conexParent != "superAdmin"
                          //     ? Object.values(companyProfile)?.[0]
                          //     : ""
                          // )
                          setIsSubscribe(true)
                        }
                      >
                        {t("Next")}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CreateNewCard;
