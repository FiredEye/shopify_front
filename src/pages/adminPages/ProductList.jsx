import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/productApi";
import { toast } from "react-toastify";
import ContentWrapper from "../../components/ContentWrapper";

const TABLE_HEAD = ["Products", "Price", "Created At", "Edit", "Delete"];

const ProductList = () => {
  const { user } = useSelector((store) => store.userInfo);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError, isFetching } = useGetProductsQuery({
    category: "all",
    page,
  });
  if (isError) return <Error error={error} />;

  const [
    deleteProduct,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,

      error: deleteError,
    },
  ] = useDeleteProductMutation();

  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState({
    id: null,
    product_image: null,
    product_name: null,
  });
  const handleDeleteBox = () => {
    setOpen(false);
    setProductIdToDelete(null);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteProduct({
        body: { old_productImg: productIdToDelete.product_image },
        token: user.token,
        id: productIdToDelete.id,
      }).unwrap();
      if (response) {
        setOpen(false);
        setProductIdToDelete({ id: null, product_image: null });
        toast.success(response);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const nav = useNavigate();
  const productListSkeleton = () => (
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
  return (
    <ContentWrapper>
      <div className="mt-8 mb-6 flex flex-col-reverse items-start res_hlg:flex-row res_hlg:items-center justify-between gap-5">
        <div>
          <Typography variant="h5" color="blue-gray">
            Product List
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all products
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => nav("/addProduct")}
            className="flex items-center gap-3"
            color="blue"
            size="sm"
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>
      <Card
        color="transparent"
        shadow={false}
        className="mx-auto w-full my-5 space-y-9 overflow-x-auto h-[500px]"
      >
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 z-[999] bg-gray-400">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                {data?.products ? (
                  data?.products.map(
                    (
                      {
                        product_image,
                        product_name,
                        createdAt,
                        _id,
                        product_price,
                      },
                      index
                    ) => {
                      const isLast = index === products.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar src={`${product_image}`} size="sm" />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {product_name}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                Rs.{product_price}
                              </Typography>
                            </div>
                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {dayjs(createdAt).format("MMM D, YYYY")}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Tooltip content="Edit Product">
                              <IconButton
                                onClick={() => nav(`/editProduct/${_id}`)}
                                variant="text"
                                color="blue-gray"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>

                          <td className={classes}>
                            <Tooltip content="Remove Product">
                              <IconButton
                                onClick={() => {
                                  setOpen(true);
                                  setProductIdToDelete({
                                    id: _id,
                                    product_image,
                                    product_name,
                                  });
                                }}
                                variant="text"
                                color="red"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
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
              productListSkeleton()
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
      <Dialog open={open} handler={handleDeleteBox}>
        <DialogHeader>
          Delete Product. ({productIdToDelete?.product_name})
        </DialogHeader>
        <DialogBody divider>Once deleted cannot be retrieved.</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleDeleteBox}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {deleteIsLoading ? (
            <Button
              disabled
              variant="gradient"
              color="red"
              className="relative py-[6px] flex justify-center w-[100px]"
            >
              <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
            </Button>
          ) : (
            <Button variant="gradient" color="red" onClick={handleDelete}>
              <span>Delete</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </ContentWrapper>
  );
};

export default ProductList;
