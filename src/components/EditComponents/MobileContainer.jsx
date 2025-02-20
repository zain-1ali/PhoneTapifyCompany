import React, { useState, useEffect } from "react";
import Mobile from "../Mobile";
import { useTranslation } from "react-i18next";
import { FetchProfileTag } from "../../Services";

const MobileContainer = ({ id }) => {
  const { t } = useTranslation();

  const [profileTag, setProfileTag] = useState(null);

  let getProfileTag = (obj) => {
    if(obj)
    {
      setProfileTag(Object.values(obj)[0]);
    }
  }; 

  useEffect(() => {
    FetchProfileTag(id, getProfileTag );
  }, []);

  const userTag = profileTag?.tagId ?? id;

  let shareUrl = import.meta.env.VITE_APP_PROFILE_URL+userTag;
  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
      <p className="text-[#ACACAC] text-[10px] font-[500]">
        {t("Live Preview")}
      </p>
      <button
        className="w-[90px] h-[30px] mt-1 rounded-[11px] border-black border font-[500] text-[12px]"
        onClick={() => window.open(shareUrl)}
      >
        {t("View Card")}
      </button>
      <Mobile id={id} />
    </div>
  );
};

export default MobileContainer;
