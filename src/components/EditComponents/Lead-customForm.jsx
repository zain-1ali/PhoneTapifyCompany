import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setFormHeader,
//   setNameVisible,
//   setEmailVisible,
//   setCompanyVisible,
//   setNoteVisible,
//   setJobVisible,
//   setPhoneVisible,
//   setLead,
// } from "../../redux/profileInfoSlice";
import { ToastContainer, toast } from "react-toastify";
import { updateLead, updateLeadMode, getLeadForms } from "../../Services";
import "react-toastify/dist/ReactToastify.css";
import LeadFormModal from "../LeadFormModal";
import { useTranslation } from "react-i18next";

const Lead = ({ uid }) => {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 50,
    height: 26,
    padding: 0,
    // position: "relative",
    // right: 0,
    // marginLeft: "50px",
    // border: "1px solid black",

    "& .MuiSwitch-switchBase": {
      padding: 0,
      marginTop: 2,
      marginLeft: 2,
      //   marginRight: -5,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(24px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme?.palette?.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme?.palette?.mode === "light"
            ? theme?.palette?.grey[100]
            : theme?.palette?.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme?.palette?.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme?.palette?.mode === "light" ? "#E9E9EA" : "#BBBBBB",
      opacity: 1,
      transition: theme?.transitions?.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  const leadMode = useSelector((state) => state.profileInfoSlice.leadMode);

  const [fields, setFields] = useState([]);
  const [leadForm, setLeadForm] = useState(false);
  const [allForms, setAllForms] = useState([]);

  const handleLeadFormOpen = () => setLeadForm(true);
  const handleLeadFormClose = () => setLeadForm(false);

  const dispatch = useDispatch();
  const formHeader = useSelector((state) => state.profileInfoSlice.formHeader) ?? "Join Network";

  // const addFieldToForm = (type) => {
  //   const newField = { id: fields.length, type, label: "", options: [] };
  //   setFields([...fields, newField]);
  // };
  const fetchForms = (data) => {
    setAllForms(data);
  };

  useEffect( () =>{
    getLeadForms(uid, fetchForms);
  },[uid]);
  console.log(allForms);
  // const handleFieldChange = (index, property, value) => {
  //   const updatedFields = [...fields];
  //   updatedFields[index][property] = value;
  //   setFields(updatedFields);
  // };

  const { t } = useTranslation();
  return (
    <div className="w-[85%] h-[95%]">
      <div className="w-[159px] h-[47px] rounded-[36px] shadow-lg font-[600] text-[16px] flex justify-center items-center">
        {t("Lead Capture")}
      </div>
      <div className="w-[100%] flex justify-between mt-4">
        <div className="w-[75%]">
          <h2 className="text-[15px] font-[500]">{t("Lead Capture Mode")}</h2>
          <p className="font-[400] text-[11px] text-[#7D7C7C] sm:w-[90%] w-[100%]">
            {t(
              "When lead capture mode is enabled, the lead form will popup as soon as your profile is shared"
            )}
          </p>
        </div>
        <div className="sm:w-[15%] w-[2%]  flex justify-center items-center">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={leadMode}
                onChange={() => updateLeadMode(leadMode, uid)}
              />
            }
          />
        </div>
      </div>
      <div className="mt-6">
      <h2 className="text-[15px] font-[500]">{t("Lead Capture Forms")}</h2>
        {allForms?.map((form, index) => (
          <div key={index} className="h-[50px] shadow-sm w-[270px] rounded-xl  bg-[#f7f7f7]  cursor-pointer p-2 flex items-center mt-2 mb-2   relative">
            {form.formHeader}
          </div>
        ))}
      </div>

      <button
      className="w-[180px] h-[40px] rounded-[15px] ml-2 mt-6 font-[600] text-[12px] shadow-md bg-[#000000] text-white"
        onClick={() =>setLeadForm(true)}
      >
        Add Form
      </button>
      {/* <div className="w-[100%] flex justify-end items-center mt-5">
        <button
          className="w-[120px] h-[40px] rounded-[15px] mr-2 font-[600] text-[12px] shadow-md"
        >
          Cancel
        </button>
        <button
          className="w-[120px] h-[40px] rounded-[15px] ml-2 font-[600] text-[12px] shadow-md bg-[#000000] text-white"
          onClick={() => updateLeadFields(uid, formHeader, fields)}
        >
          Update
        </button>
      </div> */}
      <ToastContainer position="bottom-left" autoClose={1000} theme="colored" hideProgressBar />
      {/* {
        leadForm && ( */}
          <LeadFormModal open={leadForm} handleClose={handleLeadFormClose} uid={uid} />
        {/* )
      } */}
      
    </div>
  );
};

export default Lead;
