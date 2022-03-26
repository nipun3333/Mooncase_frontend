import React from "react";

const InfoContainer = ({ title, children, padding, gridTemplateCol, width }) => {
  return (
    <div className="border border-color rounded-2xl inline-block p-4 bg-dark" 
    style={{
      padding: padding ? padding : "1rem",
      gridColumn: gridTemplateCol ? gridTemplateCol : null,
      width: width ? width : "auto"
    }}>
      <h4 className="opacity-50 text-sm">{title}</h4>
      {children}
    </div>
  );
};

export default InfoContainer;
