import React from "react";
import { useTranslation } from "react-i18next";
import logoUrl from "../../imgs/logo.png";


const ApiAccessDoc = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center mt-7">
      {/* Logo Section */}
      <div className="w-full flex justify-center mb-6">
        <img src={logoUrl} alt="PhoneTapify Logo" className="w-[250px] h-auto" />
      </div>

      {/* Container for API Documentation */}
      <div className="sm:w-[700px] w-[90%] bg-white p-8 rounded-lg shadow-lg">
        {/* Heading */}
        <div className="mt-4 text-center">
          <h2 className="font-bold sm:text-[24px] text-[20px] text-[#625F5F]">
            {t("API Documentation")}
          </h2>
          <p className="font-normal sm:text-[14px] text-[14px] text-[#707070] mt-2">
            {t(
              "Please note that all available APIs require authentication via an auth header X-API-KEY. Below you’ll find information on the types of API keys and how to generate them. We rate limit api calls to guard against bad actors. The rate limit is 40 requests / 10 seconds. If you require a higher rate limit please contact support."
            )}
          </p>
        </div>

        <br />

        {/* API Key Section */}
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

        </div>

        {/* <p className="font-normal sm:text-[14px] text-[14px] mt-6 text-center text-[#707070]">
          {t("If you need additional help or encounter any issues, please")} <a className="text-[#366fd7]" href="https://phonetapify.com/pages/support-ticket">Contact Support.</a>
        </p> */}

        <br />
      </div>
    </div>
  );
};

export default ApiAccessDoc;
