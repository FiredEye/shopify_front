import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);
  return <></>;
};

export default ScrollToTop;
