import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getSingleChild
} from "../../Services";

const ThirdPartZapier = ({ accessFrom, uid }) => {
  
 

  let [email, setEmail] = useState("");
  let [crntUser, setCrntUser] = useState({});  
  let [parentUser, setParentUser] = useState({});  

  useEffect(() => {
      getSingleChild(uid, setCrntUser);
  }, []);

  let userAccountId = Object.values(crntUser)?.[0]?.accountID ?? Object.values(crntUser)?.[0]?.id;

  useEffect(() => {
    if(userAccountId)
    {
      getSingleChild(userAccountId, setParentUser);
    }
      
  }, [userAccountId]);
  
  let parentUserData = Object.values(parentUser)?.[0];
  const { t } = useTranslation();
  let [docExpand, setDocExpand] = useState(false);
  return (
    <div className="w-full flex flex-col items-center mt-7">

      {/* Container for Third Party Support via Zapier */}
      <div
        className={`sm:w-[700px] w-[90%] bg-white rounded-[36px] py-2 px-8`}
      >
        {/* Heading */}
        <div className={`mt-5`}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold sm:text-[24px] text-[20px] text-[#625F5F]">
              {t("Third Party Support via Zapier")}
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
        </div>
        {docExpand && <br />}
        {docExpand && 
       ( <zapier-workflow
          sign-up-email={parentUserData?.email || ""}
          sign-up-first-name={parentUserData?.name || ""}
          sign-up-last-name=""
          client-id="sjbAUX69u6hRdXRTFd3Ps8DzIEQpQSZG7GKYyDGd"
          theme="light"
          intro-copy-display="show"
          manage-zaps-display="hide"
          guess-zap-display="hide"
        ></zapier-workflow>)
        }
        <br />
      </div>
    </div>

  );
};

export default ThirdPartZapier;