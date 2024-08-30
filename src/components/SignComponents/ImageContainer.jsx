import React from "react";

const ImageContainer = ({ img }) => {
  return (
    <div className="w-[45%] h-[90%]  border rounded-[60px] bg-[#000000] flex justify-center items-center">
      <img src={img} alt="" className="max-h-[97%] max-w-[97%] object-cover" />
    </div>
  );
};

export default ImageContainer;
