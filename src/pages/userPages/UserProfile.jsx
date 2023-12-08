import { Card, Typography } from "@material-tailwind/react";

import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useGetOrderByUserQuery } from "../../features/orderApi";
import UpdateForm from "./UpdateForm";
import ContentWrapper from "../../components/ContentWrapper";
import { useState } from "react";

const UserProfile = () => {
  const TABLE_HEAD = ["OrderId", "Total Price", "Date", "Status", ""];

  const nav = useNavigate();

  const { user } = useSelector((store) => store.userInfo);
  const [page, setPage] = useState(1);

  const { isLoading, error, isError, isFetching, data } =
    useGetOrderByUserQuery({ token: user.token, page });
  const orderListSkeleton = () => (
    <>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
    </>
  );

  if (isError) return <Error error={error} />;

  return (
    <ContentWrapper>
      <div className="flex flex-col md:grid md:grid-cols-5 gap-9 px-4 py-6">
        <UpdateForm />
        <div className="w-full md:col-span-3">
          <Typography
            variant="h4"
            color="blue-gray"
            className="border-[gray] border-b-2 pb-1 mb-2"
          >
            Order List
          </Typography>
          <Card className=" w-full  overflow-x-auto h-[390px] shadow-2xl">
            <table className="w-full table-auto text-left">
              <thead className="sticky top-0 z-[999] bg-gray-400">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-[15px]"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!isFetching ? (
                  <>
                    {data?.orders ? (
                      data?.orders.map(
                        ({ _id, totalPrice, createdAt, status }, index) => {
                          const isLast = index === data?.orders.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b-[2px] border-blue-gray-100";
                          const classStatus =
                            status == "pending"
                              ? "bg-yellow-200"
                              : status == "proceed"
                              ? "bg-green-200"
                              : "bg-red-200";
                          return (
                            <tr key={_id} className={classStatus}>
                              <td className={classes}>
                                <p className="font-normal">{_id}</p>
                              </td>
                              <td className={classes}>
                                <p className="font-normal">{totalPrice}</p>
                              </td>
                              <td className={classes}>
                                <p className="font-normal">
                                  {dayjs(createdAt).format("MMM D, YYYY")}
                                </p>
                              </td>
                              <td className={classes}>
                                <p className="font-normal">{status}</p>
                              </td>
                              <td className={classes}>
                                <button
                                  onClick={() => nav(`/user/order/${_id}`)}
                                >
                                  <p className="font-medium text-blue-400">
                                    Detail..
                                  </p>
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <span className="text-[24px] sm:text-[32px] md:text-[46px] font-bold p-5">
                        Sorry, Results not found
                      </span>
                    )}
                  </>
                ) : (
                  orderListSkeleton()
                )}
              </tbody>
            </table>
          </Card>
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
                  setPage((prevPage) =>
                    Math.min(prevPage + 1, data?.totalPages)
                  );
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
        </div>
      </div>
    </ContentWrapper>
  );
};
export default UserProfile;
