import React, { useRef, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Import the library
import SignLinkSelectModal from "../Modals/SignLinkSelectModal";
import { getSingleChild } from "../../Services";
import prsnPlshldr from "../../imgs/prsnPlshldr.png";
import lgoplchldr from "../../imgs/lgoplchldr.jpg";
import domtoimage from "dom-to-image";

import { returnIconsByArray } from "../../assets/ReturnSocialIcons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailSignatureModal = ({ uid, signatureModal, handleclosesignature }) => {

  let [userData, setUserData] = useState([]);
  const [Sign1links, setSign1links] = useState([]);
  const [Sign2links, setSign2links] = useState([]);
  const [signIndex, setSignIndex] = useState(1);
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");

  let getUserData = (data) => {
    var userObject = Object.values(data)[0];
    setUserData(userObject);
  };
  useEffect(() => {
    getSingleChild(uid, getUserData);
  }, [uid]);
  let [companyId, setCompanyId] = useState("");

  let [companyProfile, setCompanyProfile] = useState(null);

  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);

  useEffect(() => {
    if (userData?.signatureLinkIds && userData?.links) {
      const { signatureLinkIds, links } = userData;

      // Get links for signIndex 1
      const sign1Links = signatureLinkIds[1]?.map(linkId =>
        links.find(link => link.linkID === linkId)
      ).filter(link => link); // Filter out any undefined links

      // Get links for signIndex 2
      const sign2Links = signatureLinkIds[2]?.map(linkId =>
        links.find(link => link.linkID === linkId)
      ).filter(link => link); // Filter out any undefined links

      setSign1links(sign1Links || []);
      setSign2links(sign2Links || []);
    }
  }, [userData]);

  let getCompanyData = (data) => {
    console.log(data);
    var userObject = Object.values(data)[0];
    setCompanyProfile(userObject);
  }
  useEffect(() => {
    if (conexParent === "superAdmin") {
      getSingleChild(uid, getCompanyData);
    } else {
      getSingleChild(companyId, getCompanyData);
    }
  }, [companyId]);

  const divRef = React.useRef();
  const divRef2 = React.useRef();
  const copySign = (ref) => {
    const element = ref.current;

    const range = document.createRange();
    range.selectNodeContents(element);

    const selection = window.getSelection();
    selection.removeAllRanges(); // Clear any existing selections
    selection.addRange(range);

    try {
      document.execCommand('copy');
      toast.success(
        "Script copied to clipboard!"
      );
    } catch (error) {
      // console.error('Failed to copy content:', error);
      toast.error(
        "Failed to copy script!"
      );
    }
    selection.removeAllRanges();
  };

  const handleDownload = (ref) => {
    if (ref.current) {
      const options = {
        width: ref.current.offsetWidth * 2, // Double the size for better resolution
        height: ref.current.offsetHeight * 2, // Double the size for better resolution
      };

      // Capture the div with higher quality
      domtoimage.toPng(ref.current, { quality: 1 })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "div-image.png"; // Set the name of the downloaded image
          link.click();
        })
        .catch((error) => {
          console.error("Error capturing div as image:", error);
        });
    }
  };


  const appendBucketPath = (path) => {
    if (path && path.startsWith("gs://")) {
      const filterUrl = path.replace("gs://phonetapify-c6c06.appspot.com/", "");
      return `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${encodeURIComponent(filterUrl)}?alt=media`;
    }
    return path;
  };


  let [linkSelectModal, setLinkSelectModal] = useState(false);



  const handleCloseLinkModal = () => {
    setLinkSelectModal(false);
  };
  const handleSelectedLinks = (links) => {
    setSelectedLinks(links);
    console.log("Selected links:", links);
  };

  const { t } = useTranslation();

  return (
    // <Modal
    //   open={signatureModal}
    //   onClose={handleclosesignature}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", height: "max-content", width: "700px" }} className="bg-white p-4 rounded-lg shadow-lg">

    <div className="flex flex-col w-[98%] h-[95%] mt-[2%] mb-[10px] items-center overflow-scroll">
     

      {/* signature 1  */}
      <div style={{ display: "flex", width: "max-content", height: "max-content", marginTop: "2rem" }}>

        <div ref={divRef} >
          <p style={{ opacity: "0" }}>Email Signature</p>
          <div
            id="signature"
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              border: "1px solid #D1D5DB",
              borderRadius: "0.5rem",
              padding: "0.75rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              width: "420px",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                crossOrigin="anonymous"
                src={userData?.profileUrl ? appendBucketPath(userData?.profileUrl) : prsnPlshldr}
                alt="profile image"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginLeft: "1.25rem",
                paddingLeft: "1rem",
                paddingRight: "1.5rem",
                borderLeft: "1px solid #9CA3AF",
              }}
            >
              <div style={{ display: "flex" }}>
                {userData?.logoUrl ? (
                  <img
                    src={appendBucketPath(userData?.logoUrl)}
                    alt="profile image"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "50px",
                    }}
                  />
                ) :
                (
                  companyProfile?.logoUrl && (
                  <img
                    src={appendBucketPath(companyProfile?.logoUrl)}
                    alt="profile image"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "50px",
                    }}
                  />
                  )
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      width: "230px",
                      maxHeight: "55px",
                      overflow: "hidden",
                    }}
                  >
                    {userData?.name || ""}
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#4B5563",
                      width: "230px",
                    }}
                  >
                    {userData?.job || ""}
                  </span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "12px", fontWeight: "bold" }}>{companyProfile?.name}</div>
                <div style={{ fontSize: "13px", fontWeight: "300" }}>{userData?.phone}</div>
                <a
                  href={`mailto:${userData?.email}`}
                  style={{
                    fontSize: "13px",
                    color: "#3B82F6",
                    textDecoration: "underline",
                    fontWeight: "300",
                  }}
                >
                  {userData?.email}
                </a>
              </div>
              {
                Sign1links?.length > 0 && (
                  <div
                    style={{
                      width: "max-content", maxWidth: "80%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #D1D5DB",
                      height: "40px",
                      borderRadius: "0.25rem",
                      padding: "0.25rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", width: "95%" }}>
                      {Sign1links?.map((link) => (
                        <a href={link?.value || "#"} key={link?.linkID}>
                          {(link?.linkID === 50 || link?.linkID === 51 || link?.linkID === 52 || link?.linkID === 53 || link?.linkID === 54
                            || link?.linkID === 55 || link?.linkID === 56 || link?.linkID === 57 || link?.linkID === 58 || link?.linkID === 59) ?
                            (
                              <img
                                src={link?.image ? link?.image : returnIconsByArray("Website 1")}
                                style={{ width: "20px", height: "20px", margin: "0.25rem" }}
                                alt={link?.name}
                              />
                            ) : (
                              <img
                                src={returnIconsByArray(link?.name) ? returnIconsByArray(link?.name) : returnIconsByArray("Website 1")}
                                style={{ width: "20px", height: "20px", margin: "0.25rem" }}
                                alt={link?.name}
                              />
                            )
                          }
                        </a>
                      ))}
                    </div>
                  </div>
                )
              }


            </div>
          </div>
        </div>

        <div style={{ width: "160px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "1.25rem" }}>
        <button
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "15px",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "12px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#000000",
              color: "white",
            }}
            onClick={() => {
              setLinkSelectModal(true);
              setSignIndex(1);
            }}
          >
            {t("Select Links")}
          </button>
          <button
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "15px",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "12px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
            onClick={() => copySign(divRef)}
          >
            {t("Copy Script")}
          </button>
          <button
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "15px",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "12px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#000000",
              color: "white",
            }}
            onClick={() => handleDownload(divRef, "email-signature.png")}
          >
            {t("Download Image")}
          </button>
          
        </div>
      </div>

      {/* signature 2 */}
      <div style={{ display: "flex", width: "max-content", height: "max-content", marginTop: "3rem" }}>
        <div ref={divRef2} >
          <p style={{ opacity: "0" }}>Email Signature</p>
          <div
            id="signature"

            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              border: "1px solid #D1D5DB", // gray-300
              borderRadius: "0.5rem",
              padding: "1rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "420px",
              backgroundColor: "white",
            }}
          >
            {/* Signature Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img
                  crossOrigin="anonymous"
                  src={userData?.profileUrl ? appendBucketPath(userData?.profileUrl) : prsnPlshldr}
                  alt="profile image"
                  style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px", width: "300px", maxHeight: "55px", overflow: "hidden" }}>
                    {userData?.name || ""}
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "black", width: "300px" }}>{userData?.job || ""}</span>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
                {userData?.logoUrl ? (
                  <img
                    src={appendBucketPath(userData?.logoUrl)}
                    alt="profile image"
                    style={{ maxWidth: "200px", maxHeight: "50px" }}
                  />
                ) :
                (
                  companyProfile?.logoUrl && (
                  <img
                    src={appendBucketPath(companyProfile?.logoUrl)}
                    alt="profile image"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "50px",
                    }}
                  />
                  )
                )
                }
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "0.5rem" }}>
                <div style={{ color: "black", width: "48%" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600" }}>{companyProfile?.name}</div>
                  <div style={{ fontSize: "13px", fontWeight: "300" }}>{userData?.phone}</div>
                  <a href={`mailto:${userData?.email}`} style={{ fontSize: "13px", fontWeight: "300" }}>{userData?.email}</a>
                </div>
                {
                Sign2links?.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #D1D5DB", height: "40px", borderRadius: "0.375rem", padding: "0.25rem", width: "max-content", maxWidth: "48%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", width: "95%" }}>

                    {Sign2links?.map((link) => (
                      <a href={link?.value || "#"} key={link?.linkID}>
                        {(link?.linkID === 50 || link?.linkID === 51 || link?.linkID === 52 || link?.linkID === 53 || link?.linkID === 54
                          || link?.linkID === 55 || link?.linkID === 56 || link?.linkID === 57 || link?.linkID === 58 || link?.linkID === 59) ?
                          (
                            <img
                              src={link?.image ? link?.image : returnIconsByArray("Website 1")}
                              style={{ width: "20px", height: "20px", margin: "0.25rem" }}
                              alt={link?.name}
                            />
                          ) : (
                            <img
                              src={returnIconsByArray(link?.name) ? returnIconsByArray(link?.name) : returnIconsByArray("Website 1")}
                              style={{ width: "20px", height: "20px", margin: "0.25rem" }}
                              alt={link?.name}
                            />
                          )
                        }
                      </a>
                    ))}

                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copy to Clipboard Button */}
        <div style={{ width: "160px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "1.25rem" }}>
        <button
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "15px",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "12px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#000000",
              color: "white",
            }}
            onClick={() => {
              setLinkSelectModal(true);
              setSignIndex(2);
            }}
          > {t("Select Links")}
          </button>
            <button
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "15px",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "12px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#000000",
              color: "white",
            }}
            onClick={() => copySign(divRef2)}
          >
            {t("Copy")}
          </button>
          <button
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "15px",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "12px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#000000",
              color: "white",
            }}
            onClick={() => handleDownload(divRef2, "email-signature2.png")}
          >
            {t("Download")}
          </button>
        </div>
      </div>
      <SignLinkSelectModal
        userProfile = {userData}
        linkSelectModal={linkSelectModal}
        handleCloseLinkModal={handleCloseLinkModal}
        // handleSelectedLinks={handleSelectedLinks}
        signIndex = {signIndex}
      />
       <ToastContainer position="bottom-left" autoClose={1000} theme="colored" hideProgressBar />
    </div>

    //   </Box>
    // </Modal>
  );
};

export default EmailSignatureModal;
