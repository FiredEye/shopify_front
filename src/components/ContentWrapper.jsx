import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-[8px] res_xm:px-[15px]">
      {children}
    </div>
  );
};

export default ContentWrapper;
