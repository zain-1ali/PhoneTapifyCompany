import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
// import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import { AddSubscription, deleteContact } from "../../Services";
import { FaRegCircleCheck } from "react-icons/fa6";

const SubscriptionModal = ({ subscribeModal, handlesubscribeModal, id }) => {
  // --------------------------------------------------Create Single self profile----------------------------------

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 300,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

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

  // console.log(firstDate);

  // console.log(secondDate);

  const addYearly = () => {
    setIsMonth(false);
    setIsYear(true);
    const oneYearAfter = new Date();
    oneYearAfter.setFullYear(oneYearAfter.getFullYear() + 1);
    setSecondDate(Math.floor(oneYearAfter.getTime() / 1000));
    setFirstDate(Math.floor(Date.now() / 1000));
  };

  return (
    <div>
      <Modal
        open={subscribeModal}
        onClose={() => handlesubscribeModal()}
        aria-labelledby="subscribeModal-subscribeModal-title"
        aria-describedby="subscribeModal-subscribeModal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%]">
            <p className="text-center font-[500] mt-[20px]">
              Add subscription plan
            </p>
            {/* <div className="w-[100%] flex flex-col justify-center items-center mt-2 gap-3">
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

            <p className="text-center font-[500] mt-[20px]">Or add manually</p> */}

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

            <div className="w-[100%] flex flex-col justify-center items-center mt-4 gap-3">
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
            </div>
          </div>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
  );
};

export default SubscriptionModal;
