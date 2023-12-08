import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
