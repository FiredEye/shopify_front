import React from "react";
import ContentWrapper from "./ContentWrapper";

const Footer = () => {
  return (
    <div className="bg-[#191919] text-white">
      <ContentWrapper>
        <div className="mx-auto mt-9 py-10  flex flex-col items-center gap-8">
          <ul className="flex items-center justify-center gap-[15px] md:gap-[30px] text-[12px] sm:text-[16px]">
            <li className="cursor-pointer hover:text-orange-400 transition-all">
              Terms of Use
            </li>
            <li className="cursor-pointer hover:text-orange-400 transition-all">
              Privacy-Policy
            </li>
            <li className="cursor-pointer hover:text-orange-400 transition-all">
              About
            </li>
            <li className="cursor-pointer hover:text-orange-400 transition-all">
              Blog
            </li>
            <li className="cursor-pointer hover:text-orange-400 transition-all">
              FAQ
            </li>
          </ul>

          <div className="max-w-[800px] opacity-[0.5] text-center  text-[12px] leading-[18px] sm:text-[14px] sm:leading-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </div>
          <div className="flex items-center justify-center gap-[20px]">
            <i className="fa-brands fa-facebook fa-xl transition-all hover:text-orange-500 cursor-pointer"></i>
            <i className="fa-brands fa-instagram fa-xl transition-all hover:text-orange-500 cursor-pointer"></i>
            <i className="fa-brands fa-twitter fa-xl transition-all hover:text-orange-500 cursor-pointer"></i>
            <i className="fa-brands fa-linkedin fa-xl transition-all hover:text-orange-500 cursor-pointer"></i>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;
