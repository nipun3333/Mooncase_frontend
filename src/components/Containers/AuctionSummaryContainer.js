import React from "react";

const SummaryContainer = ({ title, children, padding, gridTemplateCol, width, gridTemplateRow }) => {
  return (
    <div className="rounded-2xl inline-block p-4 bg-app" 
    style={{
      padding: padding ? padding : "1rem",
      gridColumn: gridTemplateCol ? gridTemplateCol : null,
      gridRow: gridTemplateRow ? gridTemplateRow : null,
      width: width ? width : "auto"
      
    }}>
      <h4 className="opacity-50 text-sm">{title}</h4>
      {children}
    </div>
  );
};

export default SummaryContainer;
