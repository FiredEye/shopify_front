import React, { useState } from "react";
import CardUi from "../components/CardUi";
import { useGetProductsQuery } from "../features/productApi";
import ContentWrapper from "../components/ContentWrapper";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

const HomePage = () => {
  const [activeBtn, setActiveBtn] = useState("all");
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isError, isFetching } = useGetProductsQuery({
    category: activeBtn,
    page,
  });
  const skeleItem = () => (
    <Card className="mb-[20px] flex flex-col gap-[14px] cursor-pointer rounded-lg h-fit">
      <CardHeader className="relative h-56 aspect-[3/2] shrink-0">
        <div className="object-cover h-full w-full skeleton"></div>
      </CardHeader>
      <CardBody>
        <div className="mb-4 w-[75%] h-[22px] skeleton rounded-md"></div>
        <div className="mb-4 w-[100%] h-[18px] skeleton rounded-md"></div>
        <div className="mb-4 w-[100%] h-[18px] skeleton rounded-md"></div>

        <div>
          <div className="flex justify-between">
            <div className=" w-[40%] h-[18px] skeleton rounded-md"></div>
            <div className=" w-[40%] h-[18px] skeleton rounded-md"></div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="mt-[-20px]">
        <div className="w-[45%] skeleton rounded-md h-[40px]"></div>
      </CardFooter>
    </Card>
  );
  if (isError) return <Error error={error} />;

  return (
    <ContentWrapper>
      <div className="flex justify-center items-center gap-3 my-6 flex-wrap">
        <button
          className={`rounded-md px-4 py-1 border border-black text-black  hover:bg-gray-800 hover:text-white ${
            activeBtn === "all"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => {
            setPage(1);
            setActiveBtn("all");
          }}
        >
          All
        </button>
        <button
          className={`rounded-md px-4 py-1 border border-black text-black ${
            activeBtn === "men"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          } hover:bg-gray-800 hover:text-white `}
          onClick={() => {
            setPage(1);
            setActiveBtn("men");
          }}
        >
          Men's Clothing
        </button>
        <button
          className={`rounded-md px-4 py-1 border border-black text-black  ${
            activeBtn === "women"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          } hover:bg-gray-800 hover:text-white`}
          onClick={() => {
            setPage(1);
            setActiveBtn("women");
          }}
        >
          Women's Clothing
        </button>{" "}
        <button
          className={`rounded-md px-4 py-1 border border-black text-black  ${
            activeBtn === "kid"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          } hover:bg-gray-800 hover:text-white`}
          onClick={() => {
            setPage(1);
            setActiveBtn("kid");
          }}
        >
          Kid's Wear
        </button>
      </div>
      {!isFetching ? (
        <>
          {data?.products ? (
            <div className=" grid grid-cols-1 gap-y-10 gap-x-5 justify-between res_xm:grid-cols-2 res_sm:grid-cols-3 res_md:grid-cols-4 my-[50px] mx-5 ">
              {!isFetching &&
                data?.products.map((product) => {
                  return <CardUi key={product._id} product={product} />;
                })}
            </div>
          ) : (
            <span className="text-[24px] sm:text-[32px] md:text-[46px] font-bold p-5">
              Sorry, Results not found
            </span>
          )}
        </>
      ) : (
        <div className=" grid grid-cols-1 gap-y-8 gap-x-5 justify-between res_xm:grid-cols-2 res_sm:grid-cols-3 res_md:grid-cols-4 mt-[50px] mx-5 ">
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
        </div>
      )}
      {!isFetching && (
        <div className="flex justify-center px-5 my-5 gap-4 items-center">
          <button
            onClick={() => {
              setPage((prevPage) => Math.max(prevPage - 1, 1));
            }}
            className={`py-2 px-4 rounded bg-gray-800 text-white hover:bg-black ${
              page == 1 || page == undefined
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={page == 1 || page == undefined ? true : false}
          >
            Prev
          </button>
          <p>
            {page} - of - {data?.totalPages}
          </p>
          <button
            onClick={() => {
              setPage((prevPage) => Math.min(prevPage + 1, data?.totalPages));
            }}
            className={`py-2 px-4 rounded bg-gray-800 text-white hover:bg-black ${
              page >= data?.totalPages || page == undefined
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={page >= data?.totalPages ? true : false}
          >
            Next
          </button>
        </div>
      )}
    </ContentWrapper>
  );
};

export default HomePage;
