import React, {useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import EmailSignatureModal from "../Modals/EmailSignatureModal"



const EmailSignature = ({ uid }) => {
  let [signatureModal, setSignatureModal] = useState(true);

  let handleclosesignature = () => {
    setSignatureModal(false);
  };

  return (
    
    <EmailSignatureModal
        uid = {uid}
        signatureModal={signatureModal}
        handleclosesignature={handleclosesignature}
         />
  );
};

export default EmailSignature;
