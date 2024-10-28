import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import logoUrl from "../../imgs/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosCopy } from "react-icons/io";


const ApiAccessDoc = ({ accessFrom }) => {
  console.log(accessFrom)
  const { t } = useTranslation();
  let [docExpand, setDocExpand] = useState(false);

  let baseUrl = import.meta.env.VITE_APP_API_URL;
  let webhookUrl = baseUrl+"getConnections";

  return (
    <div className="w-full flex flex-col items-center mt-7">
      {/* Logo Section */}
      {accessFrom === "public" && (
        <div className="w-full flex justify-center mb-6">
          <img src={logoUrl} alt="PhoneTapify Logo" className="w-[250px] h-auto" />
        </div>
      )}

      {/* Container for API Documentation */}
      <div
        className={`sm:w-[700px] w-[90%] bg-white rounded-[36px] ${
          accessFrom === "public" ? "shadow-lg p-8" : "py-2 px-8"
        }`}
      >
        {/* Heading */}
        <div className={`mt-4 ${accessFrom === "public" ? "text-center" : ""}`}>
          <div className={`${accessFrom === "dashboard" ? "flex justify-between items-center" : ""}`}>
            <h2 className="font-bold sm:text-[24px] text-[20px] text-[#625F5F]">
              {t("API Documentation")}
            </h2>
            {accessFrom === "dashboard" && (
              <h2
                className="cursor-pointer text-[30px] text-[#625F5F]"
                onClick={() => setDocExpand(!docExpand)}
              >
                {docExpand ? "-" : "+"}
              </h2>
            )}
          </div>
          {accessFrom === "public" && (
            <p className="font-normal sm:text-[14px] text-[14px] text-[#707070] mt-2">
              {t(
                "Please note that all available APIs require authentication via an auth header X-API-KEY. Below you’ll find information on the types of API keys and how to generate them. We rate limit api calls to guard against bad actors. The rate limit is 40 requests / 10 seconds. If you require a higher rate limit please contact support."
              )}
            </p>
          )}
        </div>

        {docExpand && <br />}

        {/* API Key Section */}
        {docExpand && (
          <div className="mt-7">
            <h2 className="font-semibold sm:text-[20px] text-[18px] text-[#625F5F]">
              {t("API Key")}
            </h2>
            <p className="font-normal sm:text-[14px] text-[14px] text-[#707070] mt-2">
              {t("We have two types of API keys:")}
            </p>

            {/* Company Level API Key */}
            <div className="mt-5">
              <h3 className="font-semibold sm:text-[16px] text-[16px] text-[#625F5F]">
                {t("Company Level API Key")}
              </h3>
              <p className="font-normal sm:text-[14px] text-[14px] text-[#707070] mt-2">
                {t(
                  "This authenticates API requests as the organization/company. You can generate and view your company API key by:"
                )}
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Log in to your PhoneTapify dashboard.")}
                </li>
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Navigate to the Company section (located in the side menu).")}
                </li>
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Click on the API Access tab.")}
                </li>
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Click the 'copy' icon to copy your API key, or click 'Generate' if the key is empty to create a new one.")}
                </li>
              </ul>
            </div>

            {/* User Level API Key */}
            <div className="mt-7">
              <h3 className="font-semibold sm:text-[16px] text-[16px] text-[#625F5F]">
                {t("User Level API Keys")}
              </h3>
              <p className="font-normal sm:text-[14px] text-[14px] text-[#707070] mt-2">
                {t("This authenticates API requests as the user. Users can generate their API keys by:")}
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Log in to your PhoneTapify dashboard.")}
                </li>
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Go to the 'Team Members' section.")}
                </li>
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Click on 'Edit' for any team member profile.")}
                </li>
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Navigate to the 'API Access' tab.")}
                </li>
                <li className="font-normal sm:text-[14px] text-[14px] text-[#707070]">
                  {t("Click the 'copy' icon to copy your API key, or click 'Generate' if the key is empty to create a new one.")}
                </li>
              </ul>
            </div>

            {/* Webhook Section */}
            {/* {accessFrom === "public" && ( */}
            <div>
              <br />
              <h2 className="font-semibold sm:text-[20px] text-[18px] text-[#625F5F]">
                {t("API Routes")}
              </h2>
              <div className="w-[100%] mt-5 flex items-end justify-end">
                
                <div className="w-[90%]">
                  <h2 className="font-[600] text-[14px] ml-2 text-[#625F5F]">{t("GET Connections")}</h2>
                  <input
                    type="text"
                    className="w-[99%] pl-[4%] h-[46px] outline-none bg-white rounded-[36px] mt-1 shadow-md text-[#707070]"
                    value={webhookUrl}
                    disabled={true}
                  />
                </div>
                <div
                  className="sm:w-[160px] w-[8%] sm:h-[47px] h-[37px] shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(webhookUrl);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <p className="font-[500] text-[16px] mr-1">{t("Copy")}</p>
                  <IoIosCopy className="ml-1" />
                </div>
              </div>
              <p className="font-[400] sm:text-[14px] text-[14px] mt-4 w-[96%] ml-[2%] text-[#707070]">
                {t("Provides a list of 100 most recent connections created for your organization listed in descending order based on the date of creation")}
              </p>
          </div>
            {/* )} */}
          </div>
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

export default ApiAccessDoc;