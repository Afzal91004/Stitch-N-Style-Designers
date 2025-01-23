import React from "react";

const DesignerTitle = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col justify-center gap-3 mb-4">
      <div className="flex items-center gap-4">
        <div className="w-6 h-[2px] bg-pink-600"></div>
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
          <span className="text-pink-600">{text1}</span>
          <span className="text-gray-600">{text2}</span>
        </h2>
        <div className="w-10 h-[2px] bg-gray-600"></div>
      </div>
    </div>
  );
};

export default DesignerTitle;
