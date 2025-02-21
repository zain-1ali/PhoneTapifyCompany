import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {updateAnalyticsTraking} from "../../Services.jsx";
import { useDispatch, useSelector } from "react-redux";
const TrackingAnalytics = ({ uid }) => {
  
  const analyticsTracking = useSelector((state) => state.profileInfoSlice.analyticsTracking);
  const [trackingData, setTrackingData] = useState({
    ga4: analyticsTracking?.ga4,
    fbPixel: analyticsTracking?.fbPixel,
    gtm: analyticsTracking?.gtm,
  });

  const handleChange = (e) => {
    setTrackingData({ ...trackingData, [e.target.name]: e.target.value });
  };
  const { t } = useTranslation();
  let [docExpand, setDocExpand] = useState(false);

  return (
    <div className="w-full flex flex-col items-center mt-7">
     
      {/* Container for Tracking Analytics */}
      <div
        className="sm:w-[700px] w-[90%] bg-white rounded-[36px] py-1 px-8"
      >
        {/* Heading */}
        <div className="mt-5">
          <div className={"flex justify-between items-center"}>
            <h2 className="font-bold sm:text-[24px] text-[20px] text-[#625F5F]">
              {t("Tracking Analytics")}
            </h2>
            <h2
                className="cursor-pointer text-[30px] text-[#625F5F]"
                onClick={() => setDocExpand(!docExpand)}
              >
                {docExpand ? "-" : "+"}
              </h2>
          </div>
        </div>

        { docExpand && <br />}

        {/* API Key Section */}
        {docExpand && (
          <>
          <div className="mt-7">
              <div className="w-[100%] mt-5 flex items-end justify-end">                
                <div className="w-[100%]">
                  <h2 className="font-[600] text-[14px] ml-2 text-[#625F5F]">{t("Google Analytics 4 ID")}</h2>
                  <input
                    type="text"
                    name="ga4"
                    value={trackingData.ga4}
                    onChange={handleChange}
                    placeholder="Google Analytics 4 Tracking ID"
                    className="w-[99%] pl-[4%] h-[46px] outline-none bg-[#F2F2F2] rounded-[36px] mt-1  text-[#000000]"
                  />
                </div>
              </div>
          </div>
           <div className="mt-7">
              <div className="w-[100%] mt-5 flex items-end justify-end">                
                <div className="w-[100%]">
                  <h2 className="font-[600] text-[14px] ml-2 text-[#625F5F]">{t("Facebook Pixel ID")}</h2>
                  <input
                    type="text"
                    name="fbPixel"
                    value={trackingData.fbPixel}
                    onChange={handleChange}
                    placeholder="Facebook Pixel ID"
                    className="w-[99%] pl-[4%] h-[46px] outline-none bg-[#F2F2F2] rounded-[36px] mt-1  text-[#000000]"
                  />
                </div>
              </div>
          </div>
        <div className="mt-7">
            <div className="w-[100%] mt-5 flex items-end justify-end">                
              <div className="w-[100%]">
                <h2 className="font-[600] text-[14px] ml-2 text-[#625F5F]">{t("Google Tag Manager ID")}</h2>
                <input
                  type="text"
                  name="gtm"
                  value={trackingData.gtm}
                  onChange={handleChange}
                  placeholder="Google Tag Manager ID"
                  className="w-[99%] pl-[4%] h-[46px] outline-none bg-[#F2F2F2] rounded-[36px] mt-1  text-[#000000]"
                />
              </div>
            </div>
        </div>
        <div className=" w-[100%]  mt-5 bg-white flex justify-end items-center cursor-pointer"
            onClick={() => {updateAnalyticsTraking(uid, trackingData)}}
          >
            <p className=" sm:w-[160px] w-[8%] sm:h-[47px] h-[37px] bg-[black] text-[white] flex justify-center items-center rounded-[18px] font-[500] text-[16px] mr-1">{t("Submit")}</p>
          </div>
        </>
        )}
        <br />
      </div>
      <ToastContainer
          position="bottom-left"
          autoClose={1000}
          theme="colored"
          hideProgressBar
        />
    </div>
    
  );
};

export default TrackingAnalytics;