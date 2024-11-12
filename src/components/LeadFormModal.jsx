import React, { useState } from "react";
import { Modal, Button, FormControlLabel, Radio, MenuItem, Select, TextField, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFormHeader } from "../redux/profileInfoSlice";
import { ToastContainer } from "react-toastify";
import { addLeadForm } from "../Services";
import { IoMdRemoveCircle } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const LeadFormModal = ({ uid, open, handleClose }) => {
  const [fields, setFields] = useState([]);
  const dispatch = useDispatch();
  const formHeader = useSelector((state) => state.profileInfoSlice.formHeader) ?? "Join Network";

  const addFieldToForm = (type) => {
    const newField = { id: fields.length, type, label: "", options: [] };
    setFields([...fields, newField]);
  };

  const handleFieldChange = (index, property, value) => {
    const updatedFields = [...fields];
    updatedFields[index][property] = value;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    addLeadForm(uid, formHeader, fields);
    handleClose(); // Close the modal after submitting
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content w-[40%] min-w-[400px] h-[95%] mx-auto mt-10 p-5 bg-white rounded shadow-lg overflow-scroll">
        <h2 className="w-[100%] h-[47px font-[600] text-[16px] flex justify-left items-center">
          Add a Custom Form
        </h2>
        <div className="mt-5 w-[65%]">
          <h2 className="font-[600] text-[12px]">Form Header</h2>
          <input
            type="text"
            className="w-[100%] h-[34px] outline-none bg-[#F3F3F3] border border-[#ACABAB] rounded-[10px] p-[10px] mt-1"
            onChange={(e) => dispatch(setFormHeader(e.target.value))}
            value={formHeader}
          />
        </div>
        <div className="mt-[10px] w-[100%]">
          {fields.map((field, index) => (
            <div key={field.id} className="mt-3 border-[1px] rounded-[10px] p-3 pt-[40px] relative">
              <TextField
                label="Field Label"
                value={field.label}
                onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                className="mb-2"
                sx={{ mb: 1 }}
              />
              {field.type === "radio" && (
                <div>
                  <TextField
                    label="Options (comma separated)"
                    onChange={(e) => handleFieldChange(index, "options", e.target.value.split(","))}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </div>
              )}
              {field.type === "select" && (
                <div>
                  <TextField
                    label="Options (comma separated)"
                    onChange={(e) => handleFieldChange(index, "options", e.target.value.split(","))}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </div>
              )}
              {/* Render the field based on type */}
              {field.type === "text" && <TextField variant="outlined" fullWidth size="small" />}
              {field.type === "email" && <TextField type="email" variant="outlined" fullWidth size="small" />}
              {field.type === "number" && <TextField type="number" variant="outlined" fullWidth size="small" />}
              {field.type === "date" && <TextField type="date" variant="outlined" fullWidth size="small" />}
              {field.type === "textarea" && <TextField multiline rows={4} variant="outlined" fullWidth />}
              {field.type === "radio" && (
                <div>
                  {field.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Radio
                          checked={field.selectedOption === option.trim()}
                          onChange={() => handleFieldChange(index, "selectedOption", option.trim())}
                        />
                      }
                      label={option.trim()}
                    />
                  ))}
                </div>
              )}
              {field.type === "select" && (
                <Select fullWidth displayEmpty>
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option.trim()}>
                      {option.trim()}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <IconButton
                aria-label="remove"
                onClick={() => removeField(index)}
                style={{ color: "#ff5449", position: "absolute", top: "0px", right: "0px" }}
              >
                <IoMdRemoveCircle />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="mt-5 w-[100%]">
          <Select
            onChange={(e) => addFieldToForm(e.target.value)}
            fullWidth
            value=""
            displayEmpty
            renderValue={(selected) => {
              if (selected === "") {
                return "Select Field Type";
              }
              return selected;
            }}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="radio">Radio Button</MenuItem>
            <MenuItem value="select">Select Dropdown</MenuItem>
            <MenuItem value="textarea">Textarea</MenuItem>
          </Select>
        </div>
        <div className="w-[220px] flex justify-between items-center mt-5">
          <Button variant="outlined" onClick={handleClose} className="mr-2">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} className="ml-2">
            Add Form
          </Button>
        </div>
        <ToastContainer position="bottom-left" autoClose={1000} theme="colored" hideProgressBar />
      </div>
    </Modal>
  );
};

export default LeadFormModal;
