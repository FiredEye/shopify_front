import { Rating } from "@material-tailwind/react";
import React from "react";
import { useGetSimilarProductsQuery } from "../features/productApi";
import { baseUrl } from "../features/constant";
import { useNavigate } from "react-router-dom";
import Image from "./lazyLoadImage/Image";

const SimilarProducts = ({ productID }) => {
  const nav = useNavigate();
  const { data, isLoading, error, isError, isFetching } =
    useGetSimilarProductsQuery(productID);

  const productSkeletonItem = () => (
    <div className="flex gap-3 ">
      <div className="shrink-0 ">
        <div className=" relative block w-[140px] lg:w-[200px]  aspect-[3/2] rounded-xl overflow-hidden">
          <div className="object-cover h-full w-full skeleton"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="w-[50%] h-[20px] rounded-md skeleton"></div>
        <div className="w-[75%] h-[18px] rounded-md skeleton"></div>
        <div className="w-[50%] h-[16px] rounded-md skeleton"></div>
        <div className="w-[50%] h-[16px] rounded-md skeleton"></div>
      </div>
    </div>
  );
  if (isError) return <Error error={error} />;

  return (
    <>
      <div className="lg:col-span-2 flex flex-col gap-4 items-center">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-[28px] font-bold mb-2">Similar Products:</h1>

          {!isFetching ? (
            <>
              {data ? (
                <>
                  {data.map((product) => {
                    return (
                      <div
                        className=" flex gap-3 cursor-pointer"
                        key={product._id}
                        onClick={() => nav(`/productDetail/${product._id}`)}
                        title={product.product_name}
                      >
                        <div className="shrink-0 ">
                          <div className=" relative block w-[140px] lg:w-[200px]  aspect-[3/2] rounded-xl overflow-hidden bg-blue-gray-600">
                            <Image
                              src={`${baseUrl}${product.product_image}`}
                              alt="product image"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ">
                          <h1 className="text-[20px] font-semibold line-clamp-1">
                            {product.product_name}
                          </h1>
                          <h2 className="text-[16px]">
                            Rs. {product.product_price}
                          </h2>
                          {product.numReviews === 0 ? (
                            <div className="flex-col gap-2">
                              <Rating readonly /> <p>0 reviews</p>
                            </div>
                          ) : (
                            <div className="flex-col gap-2">
                              <Rating value={product.rating} readonly />{" "}
                              <p>{product.numReviews} reviews</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <span className="text-[24px] sm:text-[32px] md:text-[46px] font-bold p-5">
                  Sorry, Results not found
                </span>
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-4">
              {productSkeletonItem()}
              {productSkeletonItem()}
              {productSkeletonItem()}
              {productSkeletonItem()}
              {productSkeletonItem()}
              {productSkeletonItem()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
