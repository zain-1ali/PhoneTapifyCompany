import React, { useEffect, useState } from "react";
import {
  getSingleChild, generateNewApiKey
} from "../../Services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { IoIosCopy } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import ApiAccessDoc from "../SettingsComponents/ApiAccessDoc";
import ThirdPartZapier from "./ThirdPartZapier";
import TrackingAnalytics from "./TrackingAnalytics";


const ApiAccess = ({ uid }) => {
  let [email, setEmail] = useState("");
  let [apiDocExpand, setApiDocExpand] = useState(false);
  let [crntParent, setCrntParent] = useState({});
  useEffect(() => {
    getSingleChild(uid, setCrntParent);
  }, []);
  let baseUrl = import.meta.env.VITE_APP_API_URL;
  let webhookUrl = baseUrl + "getConnections";
  let apiKey = Object.values(crntParent)?.[0]?.apiKey ?? "";

  const generateApiKey = () => {
    generateNewApiKey(uid);
  }
  const { t } = useTranslation();
  return (
    <div className="w-[100%]  mt-7 flex flex-col">
      <div className="sm:w-[700px] w-[100%] ml-[20px]">


      <TrackingAnalytics uid={uid} />

        {/* api docs section started */}

          <div className="mt-7 w-[100%] flex flex-col items-center justify-center bg-white rounded-[36px] py-2 px-8">
            <div className=" w-[100%] flex items-center justify-between py-4">
              <h2 className="font-bold sm:text-[24px] text-[24px] text-[#625F5F]">
                {t("API Key")}
              </h2>
              <h2
                className="cursor-pointer text-[30px] text-[#625F5F]"
              onClick={() => setApiDocExpand(!apiDocExpand)}
              >
                {apiDocExpand ? "-" : "+"}
              </h2>
            </div>
            {apiDocExpand && (
            <div className="w-[100%] flex items-center flex-col">
              <p className="font-[400] sm:text-[14px] text-[14px] text-[#707070]">
                {t(
                  "Please note that all available APIs require authentication via an auth header X-API-KEY. Your api key will be listed in the section below.  We rate limit api calls to guard against bad actors. The rate limit is 40 requests / 10 seconds. If you require a higher rate limit please contact support."
                )}
              </p>
              <br />
              <div className="w-[100%] mt-5 flex items-end justify-end">
                <div className="w-[100%] ">
                  <h2 className="font-[600] text-[14px] ml-2">{t("Api Key")}</h2>
                  <input
                    type="text"
                    className="w-[99%] pl-[4%] h-[46px] outline-none bg-white rounded-[36px] mt-1"
                    value={apiKey}
                    disabled={true}
                  />
                </div>
                {
                  apiKey != "" ? (
                    <div
                      className="sm:w-[160px] w-[8%] sm:h-[47px] h-[37px]  shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey),
                          toast.success("Copied to clipboard");
                      }}
                    >
                      <p className="font-[500] text-[16px] mr-1">{t("Copy")}</p>
                      <IoIosCopy className="ml-1" />
                    </div>
                  ) : (
                    <div
                      className="sm:w-[160px] w-[8%] sm:h-[47px] h-[37px]  shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer"
                      onClick={generateApiKey}
                    >
                      <p className="font-[500] text-[16px] mr-1">{t("Generate")}</p>
                      <BiRefresh className="ml-1" />
                    </div>
                  )
                }

              </div>
              <div className="w-[100%] mt-5 flex items-end justify-end">
                <div className="w-[90%] ">
                  <h2 className="font-[600] text-[14px] ml-2">{t("GET Connections")}</h2>
                  <input
                    type="text"
                    className="w-[99%] pl-[4%] h-[46px] outline-none bg-white rounded-[36px] mt-1"
                    value={webhookUrl}
                    disabled={true}
                  />
                </div>
                <div
                  className="sm:w-[160px] w-[8%] sm:h-[47px] h-[37px]  shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(webhookUrl),
                      toast.success("Copied to clipboard");
                  }}
                >
                  <p className="font-[500] text-[16px] mr-1">{t("Copy")}</p>
                  <IoIosCopy className="ml-1" />
                </div>
              </div>
              <p className="font-[400] sm:text-[14px] text-[14px] mt-4 w-[96%] ml-[2%] text-[#707070]">Provides a list of 100 most recent connections created for your organization listed in descending order based on the date of creation</p>
              
            </div>
            )}
          </div>
        
        {/* apis docs section ends */}
                  

        <ApiAccessDoc accessFrom="dashboard" />

        <ThirdPartZapier accessFrom="dashboard" uid={uid} />
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          theme="colored"
          hideProgressBar
        />

        <br />
      </div>
    </div>
  );
};

export default ApiAccess;
