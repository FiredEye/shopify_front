import { Rating, Button } from "@material-tailwind/react";
import Review from "../components/Review.jsx";
import { useGetProductByIdQuery } from "../features/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateCart } from "../features/userSlice";
import ContentWrapper from "../components/ContentWrapper.jsx";
import { useParams, useNavigate } from "react-router-dom";
import SimilarProductPage from "../components/SimilarProducts.jsx";
import Image from "../components/lazyLoadImage/Image.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
    isError,
    isFetching,
  } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userInfo);

  const nav = useNavigate();
  const productDetailSkeleItem = () => (
    <div className="flex flex-col gap-[25px] md:gap-[50px] lg:flex-row py-[20px] sm:py[30px] md:py-[50px] z-10 border-b border-gray-400 mb-6">
      <div className="shrink-0">
        <div className="relative block w-full lg:w-[480px] xl:w-[600px] aspect-[3/2] rounded-xl overflow-hidden">
          <div className="object-cover h-full w-full skeleton"></div>
        </div>
      </div>
      <div className="space-y-4 flex flex-col justify-between py-3 w-full">
        <div className="flex flex-col gap-5">
          <div className="mb-4 w-[75%] h-[32px] sm:h-[46px] skeleton rounded-md"></div>
          <div>
            <div className="mb-4 w-[45%] h-[20px] skeleton rounded-md"></div>
            <div className="mb-4 w-[45%] h-[20px] skeleton rounded-md"></div>
          </div>
          <div>
            <div className="mb-4 w-[100%] h-[20px] skeleton rounded-md"></div>
            <div className="mb-4 w-[100%] h-[20px] skeleton rounded-md"></div>
          </div>
          <div className="mb-4 w-[65%] h-[24px] sm:h-[36px] skeleton rounded-md"></div>
        </div>
        <div className="w-[50%] my-5 h-[50px] rounded-md skeleton"></div>
      </div>
    </div>
  );
  const reviewSkeletonItem = () => (
    <div className="p-5 lg:col-span-3 flex flex-col gap-3">
      <div className="w-full mb-4">
        <div className="w-[30%] h-[36px] rounded-md skeleton"></div>
      </div>
      <div className="my-7 border-y-1">
        <div className="h-[22px] self-center skeleton"></div>
      </div>
      <div className="w-full border-[1px] border-gray-400 p-3 mb-3 flex gap-3 rounded-md">
        <div className="inline-block shrink-0 relative !rounded-full w-[58px] h-[58px] skeleton"></div>

        <div className="flex w-full flex-col ">
          <div className="w-[50%] h-[18px] mb-3 skeleton rounded-md"></div>
          <div className="w-[100%] h-[16px] mb-1 skeleton rounded-md"></div>
          <div className="w-[80%] h-[16px] mb-3 skeleton rounded-md"></div>
          <div className="w-[30%] h-[18px] mb-1 skeleton rounded-md"></div>
        </div>
      </div>
      <div className="w-full border-[1px] border-gray-400 p-3 mb-3 flex gap-3 rounded-md">
        <div className="inline-block shrink-0 relative !rounded-full w-[58px] h-[58px] skeleton"></div>

        <div className="flex w-full flex-col ">
          <div className="w-[50%] h-[18px] mb-3 skeleton rounded-md"></div>
          <div className="w-[100%] h-[16px] mb-1 skeleton rounded-md"></div>
          <div className="w-[80%] h-[16px] mb-3 skeleton rounded-md"></div>
          <div className="w-[30%] h-[18px] mb-1 skeleton rounded-md"></div>
        </div>
      </div>{" "}
      <div className="w-full border-[1px] border-gray-400 p-3 mb-3 flex gap-3 rounded-md">
        <div className="inline-block shrink-0 relative !rounded-full w-[58px] h-[58px] skeleton"></div>

        <div className="flex w-full flex-col ">
          <div className="w-[50%] h-[18px] mb-3 skeleton rounded-md"></div>
          <div className="w-[100%] h-[16px] mb-1 skeleton rounded-md"></div>
          <div className="w-[80%] h-[16px] mb-3 skeleton rounded-md"></div>
          <div className="w-[30%] h-[18px] mb-1 skeleton rounded-md"></div>
        </div>
      </div>
    </div>
  );
  if (isError) return <Error error={error} />;
  return (
    <div className=" mb-[50px]">
      <ContentWrapper>
        {!isFetching ? (
          <>
            {product && (
              <div className="flex flex-col gap-[25px] md:gap-[50px] lg:flex-row py-[20px] sm:py[30px] md:py-[50px] z-10 border-b border-gray-400 mb-6">
                <div className="shrink-0">
                  <div className="relative block w-full lg:w-[480px] xl:w-[600px] aspect-[3/2] rounded-xl overflow-hidden bg-blue-gray-600">
                    <Image
                      src={`${product.product_image}`}
                      alt="product image"
                    />
                  </div>
                </div>
                <div className="space-y-4 flex flex-col justify-between py-3 ">
                  <div className="flex flex-col gap-5">
                    <h1 className="text-[20px] sm:text-[32px] font-bold">
                      {product.product_name}
                    </h1>
                    {product.numReviews === 0 ? (
                      <div className="flex flex-col justify-between gap-2">
                        <Rating readonly />
                        <h1>No Reviews yet</h1>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-between gap-2">
                        <Rating value={product.rating} readonly />
                        <h1>{product.numReviews} reviews</h1>
                      </div>
                    )}
                    <p className="text-[16px] line-clamp-3">
                      {product.product_detail} Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Vero nam debitis rerum nemo
                      eum id praesentium quidem, odit error in.
                    </p>
                    <h4 className="text-[16px] sm:text-[26px] py-1 font-semibold ">
                      CURRENT PRICE:Rs. {product.product_price}
                    </h4>
                  </div>
                  {!user?.isAdmin && (
                    <Button
                      onClick={() => {
                        if (user) {
                          dispatch(
                            addOrUpdateCart({
                              name: product.product_name,
                              qty: Number(1),
                              image: product.product_image,
                              price: product.product_price,
                              product: product._id,
                              countInStock: product.countInStock,
                            })
                          );
                          nav("/user/cart");
                        } else {
                          nav("/login");
                        }
                      }}
                      className=" w-[50%] my-5 h-[50px]"
                    >
                      Add To Cart
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>{productDetailSkeleItem()}</>
        )}
        <div className="flex flex-col-reverse lg:grid  lg:grid-cols-5 ">
          {!isFetching ? (
            <>{product && <Review product={product} />}</>
          ) : (
            <>{reviewSkeletonItem()}</>
          )}

          {product && <SimilarProductPage productID={product._id} />}
          <div className="lg:col-span-2 flex flex-col gap-4 items-center"></div>
        </div>
      </ContentWrapper>
    </div>
  );
};
export default ProductDetail;
