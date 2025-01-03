import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QRCode } from "react-qrcode-logo";
import { FetchProfileTag } from "../../Services";
import { useSelector } from "react-redux";

const QrContainer = ({ uid }) => {
  const qrLogo = useSelector((state) => state.profileInfoSlice.qrLogo);
  const qrColor = useSelector((state) => state.profileInfoSlice.qrColor);

  const [profileTag, setProfileTag] = useState(null);

  let getProfileTag = (obj) => {
    if(obj)
    {
      setProfileTag(Object.values(obj)[0]);
    }
  }; 

  useEffect(() => {
    FetchProfileTag(uid, getProfileTag );
  }, []);

  const userTag = profileTag?.tagId ?? uid;

  let shareUrl = import.meta.env.VITE_APP_PROFILE_URL+userTag;

  const downloadQRCode = () => {
    const canvas = document.getElementById("qrCodeEl");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QR_Code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  const { t } = useTranslation();
  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
      <div className="h-[90%] w-[80%] flex flex-col justify-around items-center">
        <h2 className="font-[500] text-lg">{t("User's QR Code")}</h2>
        <QRCode
          value={`${shareUrl}`}
          size="171"
          logoImage={qrLogo}
          fgColor={qrColor ? qrColor : "black"}
          logoOpacity="0.6"
          logoWidth="50"
          logoHeight="50"
          // eyeRadius={10}
        />
        {/* </div> */}

        <div style={{ display: "none" }}>
          <QRCode
            id="qrCodeEl"
            value={`${shareUrl}`}
            size="171"
            logoImage={qrLogo}
            enableCORS={true}
            fgColor={qrColor ? qrColor : "black"}
            logoOpacity={0.2}
            logoWidth={90}
            logoHeight={90}
            // eyeRadius={10}
          />
        </div>

        <div
          className="h-[46px] w-[135px] rounded-full bg-[#000000] flex justify-center leading-[19px] items-center text-white cursor-pointer text-center"
          onClick={() => downloadQRCode()}
        >
          {t("Download Qr")}
        </div>
      </div>
    </div>
  );
};

export default QrContainer;
