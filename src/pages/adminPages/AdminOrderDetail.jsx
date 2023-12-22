import { useNavigate, useParams } from "react-router";
import {
  useGetOrderByIdForAdminQuery,
  useUpdateOrderStatusMutation,
} from "../../features/orderApi";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import ContentWrapper from "../../components/ContentWrapper";
import dayjs from "dayjs";
import Image from "../../components/lazyLoadImage/Image";

const OrderDetail = () => {
  const { id } = useParams();

  const { user } = useSelector((store) => store.userInfo);
  const nav = useNavigate();

  const { isLoading, isError, error, isFetching, data } =
    useGetOrderByIdForAdminQuery({
      id,
      token: user.token,
    });

  const [updateOrderStatusToProceed, { isLoading: proceedLoading }] =
    useUpdateOrderStatusMutation();

  const [updateOrderStatusToCancel, { isLoading: cancelLoading }] =
    useUpdateOrderStatusMutation();

  if (isError) return <Error error={error} />;

  const handleOrderStatus = async (orderStatus) => {
    try {
      if (orderStatus == "proceed") {
        const response = await updateOrderStatusToProceed({
          body: { status: "proceed" },
          token: user.token,
          id,
        }).unwrap();

        toast.success(response);
      } else {
        const response = await updateOrderStatusToCancel({
          body: { status: "cancel" },
          token: user.token,
          id,
        }).unwrap();

        toast.success(response);
      }
      nav(-1);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const summarySkeleton = () => (
    <div className="lg:col-span-2 w-full bg-gray-200 rounded-lg p-4">
      <h1 className="text-[26px] font-[500] mb-3 border-b-2 py-2 border-gray-500">
        Summary:
      </h1>

      <table className="w-full table-auto text-[18px]">
        <tbody>
          <tr>
            <td className="p-4">
              <div className="w-full h-[16px] skeleton rounded-md"></div>
            </td>
            <td className="p-4">
              <div className="w-full h-[16px] skeleton rounded-md"></div>
            </td>
          </tr>
          <tr>
            <td className="p-4">
              <div className="w-full h-[16px] skeleton rounded-md"></div>
            </td>
            <td className="p-4">
              <div className="w-full h-[16px] skeleton rounded-md"></div>
            </td>
          </tr>
          <tr>
            <td className="p-4">
              <div className="w-full h-[16px] skeleton rounded-md"></div>
            </td>
            <td className="p-4">
              <div className="w-full h-[16px] skeleton rounded-md"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const productSkeleton = () => (
    <div className="flex flex-col res_xxm:flex-row gap-5  mb-5 w-full bg-gray-200 rounded-lg p-4">
      <div className="self-center relative shrink-0 w-[130px] sm:w-[200px] aspect-[3/2]">
        <div className="w-full h-full skeleton"></div>
      </div>

      <div className="flex flex-col justify-between w-full gap-3">
        <div className="w-full flex flex-col gap-3">
          <div className="w-[65%] h-[15px] res_xxm:h-[18px] res_xm:h-[22px] rounded-md skeleton"></div>
          <div className="hidden w-[65%] h-[15px] res_xxm:h-[18px] res_xxm:block res_xm:h-[22px] rounded-md skeleton"></div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="w-[35%] h-[11px] res_xxm:h-[14px] res_xm:h-[18px] rounded-md skeleton"></div>
          <div className="w-[20%] h-[11px] res_xxm:h-[14px] res_xm:h-[18px] rounded-md skeleton"></div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="p-4">
      <ContentWrapper>
        <div className="flex w-full flex-col-reverse sm:flex-row justify-between items-start sm:items-center mt-5 mb-8 gap-4">
          <h1 className="text-2xl font-bold">Order Details:</h1>

          <div className="flex gap-2 flex-wrap">
            {proceedLoading ? (
              <Button
                disabled
                className=" relative py-1 flex justify-center w-[150px]"
                color="green"
              >
                <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
              </Button>
            ) : (
              <Button
                color="green"
                onClick={() => handleOrderStatus("proceed")}
                className="w-[150px]"
              >
                Proceed
              </Button>
            )}
            {cancelLoading ? (
              <Button
                disabled
                className=" relative py-1 flex justify-center w-[150px]"
                color="red"
              >
                <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
              </Button>
            ) : (
              <Button
                color="red"
                onClick={() => handleOrderStatus("cancel")}
                className="w-[150px]"
              >
                Cancel Order
              </Button>
            )}
          </div>
        </div>
        {!isFetching ? (
          <>
            {data ? (
              <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 items-start">
                <div className="w-full lg:col-span-3 items-start ">
                  {data.orderItems.map((order) => {
                    return (
                      <div
                        key={order._id}
                        className="flex flex-col res_xxm:flex-row gap-5  mb-5 w-full bg-gray-200 rounded-lg p-4"
                      >
                        <div className="self-center relative shrink-0 w-[130px] sm:w-[200px] aspect-[3/2] overflow-hidden bg-blue-gray-600">
                          <Image src={`${order.image}`} alt="product image" />
                        </div>

                        <div className="flex flex-col justify-between w-full">
                          <h1 className="text-[15px] res_xxm:text-[18px] res_xm:text-[22px] font-[500] line-clamp-1 res_xxm:line-clamp-2">
                            {order.name} Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Molestias, id.
                          </h1>
                          <div className="flex justify-between items-center">
                            <p className=" text-[11px] res_xxm:text-[14px] res_xm:text-[18px]">
                              Price: Rs. {order.price}
                            </p>
                            <p className=" text-[11px] res_xxm:text-[14px] res_xm:text-[18px]">
                              Qty: {order.qty}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="lg:col-span-2 w-full bg-gray-200 rounded-lg p-4">
                  <h1 className="text-[26px] font-[500] mb-3 border-b-2 py-2 border-gray-500">
                    Summary:
                  </h1>

                  <table className="w-full table-auto text-[18px]">
                    <tbody>
                      <tr>
                        <td className="p-2 border-b border-gray-400 text-start ">
                          <p className="font-normal">Username</p>
                        </td>
                        <td className="text-center border-b border-gray-400">
                          <p className="font-normal">{data.user.fullname}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border-b border-gray-400 text-start ">
                          <p className="font-normal">Email Address</p>
                        </td>
                        <td className="text-center border-b border-gray-400">
                          <p className="font-normal">{data.user.email}</p>
                        </td>
                      </tr>
                      <tr className="">
                        <td className=" p-2 border-b border-gray-400 text-start ">
                          <p className="font-normal">Delivery Address</p>
                        </td>
                        <td className="text-center border-b border-gray-400 ">
                          <p className="font-normal">
                            {data.shippingAddress.address}
                          </p>
                          <p className="font-normal">
                            {data.shippingAddress.city}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-2 text-start border-b border-gray-400">
                          <p className="font-normal">Total Price</p>
                        </td>
                        <td className="text-center border-b border-gray-400">
                          <p className="font-normal">Rs. {data.totalPrice}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2  text-start">
                          <p className="font-normal">Date</p>
                        </td>
                        <td className="text-center">
                          {dayjs(data.createdAt).format("MMM D, YYYY")}
                          <p className="font-normal"></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <span className="text-[24px] sm:text-[32px] md:text-[46px] font-bold p-5">
                Sorry, Results not found
              </span>
            )}
          </>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 items-start">
            <div className="w-full lg:col-span-3 items-start ">
              {productSkeleton()} {productSkeleton()} {productSkeleton()}{" "}
              {productSkeleton()}
            </div>
            {summarySkeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};
export default OrderDetail;
