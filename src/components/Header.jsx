import React, { useState } from "react";

import {
  Input,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../features/userSlice";

import ContentWrapper from "./ContentWrapper";
const menuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Cart",
    icon: ShoppingCartIcon,
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const adminMenu = [
  {
    label: "Admin Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Product List",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const Header = () => {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();
  const menu = user?.isAdmin ? adminMenu : menuItems;

  const handleSearch = () => {
    if (search) {
      nav(`/searchProduct/${search.trim()}`);
      setSearch("");
      setShowInput(false);
    }
  };
  return (
    <div className="h-[60px] bg-[#191919] text-white">
      <ContentWrapper>
        <div className=" flex justify-between  items-center  text-center font-bold">
          <Typography className=" cursor-pointer py-1.5 font-medium">
            <NavLink
              to="/"
              replace
              className={"text-orange-600 font-bold text-[30px]"}
            >
              {" "}
              Shopi<span className="italic text-green-600 mr-[5px]">f</span>y
            </NavLink>
          </Typography>
          <div className="flex gap-4">
            <div className="hidden gap-[20px] items-center res_hlg:flex">
              <div className="relative flex w-full gap-2 md:w-max">
                <Input
                  type="text"
                  label="Search Products..."
                  className="pr-[52px]"
                  color="white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <Button
                  size="sm"
                  color="green"
                  className="!absolute right-1 top-[6px] rounded"
                  onClick={handleSearch}
                >
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                      fill="#CFD8DC"
                    />
                    <path
                      d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                      stroke="#CFD8DC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
              {!user && (
                <div className="bg-green-500 px-2 py-1 rounded-md  hover:bg-green-600">
                  <NavLink to="/login">Login</NavLink>
                </div>
              )}
            </div>
            <div className="flex items-center gap-[16px] res_hlg:hidden">
              <span
                className="cursor-pointer"
                onClick={() => {
                  setShowInput((prev) => !prev);
                }}
              >
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
              </span>
              {!user && (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setShowInput(false);
                    nav("/login");
                  }}
                >
                  <i className="fa-solid fa-arrow-right-to-bracket fa-xl"></i>
                </span>
              )}
            </div>
            {user && (
              <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom-end"
              >
                <MenuHandler>
                  <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                  >
                    <Avatar
                      variant="circular"
                      size="sm"
                      alt="tania andrew"
                      className="border border-blue-500 p-0.5"
                      src={`${user.profile_image}`}
                    />
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className="p-1">
                  {menu.map(({ label, icon }, key) => {
                    const isLastItem = key === menuItems.length - 1;
                    return (
                      <MenuItem
                        key={label}
                        onClick={() => {
                          switch (label) {
                            case "Admin Profile":
                              nav("/admin/allDetail");
                              break;
                            case "Product List":
                              nav("/allProducts");
                              break;
                            case "My Profile":
                              nav("/user/profile");
                              break;
                            case "Cart":
                              nav("/user/cart");
                              break;
                            case "Sign Out":
                              dispatch(clearAll());
                              break;
                          }
                        }}
                        className={`flex items-center gap-2 rounded ${
                          isLastItem
                            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                            : ""
                        }`}
                      >
                        {React.createElement(icon, {
                          className: `h-4 w-4 ${
                            isLastItem ? "text-red-500" : ""
                          }`,
                          strokeWidth: 2,
                        })}
                        <Typography
                          as="span"
                          variant="small"
                          className="font-normal"
                          color={isLastItem ? "red" : "inherit"}
                        >
                          {label}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            )}
          </div>
          {showInput && (
            <div className="absolute top-[60px] left-0 h-[70px] w-full  res_hlg:hidden bg-[#191919]">
              <ContentWrapper>
                <input
                  className=" w-full p-[15px] res_hlg:hidden border outline-none text-black rounded"
                  placeholder="Search Products..."
                  value={search}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </ContentWrapper>
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Header;
