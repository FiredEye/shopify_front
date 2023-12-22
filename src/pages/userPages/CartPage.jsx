import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateCart, removeCart } from "../../features/userSlice";
import ContentWrapper from "../../components/ContentWrapper";
import Image from "../../components/lazyLoadImage/Image";

const CartPage = () => {
  const { carts, user } = useSelector((store) => store.userInfo);
  const nav = useNavigate();

  const dispatch = useDispatch();

  const total = carts.reduce((a, b) => {
    return a + b.qty * b.price;
  }, 0);

  return (
    <div className="p-4 ">
      <ContentWrapper>
        {carts.length === 0 ? (
          <div className="h-[360px] mt-[120px] text-center">
            <h1 className="text-[22px] font-bold mb-[-40px]">Empty Cart:</h1>
            <lottie-player
              src="https://lottie.host/d9b09000-90b8-4068-93ff-04b8e399f0ed/MnhzolmZTp.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        ) : (
          <>
            <h1 className="text-2xl mt-2 mb-7 font-bold">Shopping Cart:</h1>
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 items-start">
              <div className="w-full lg:col-span-3 items-start ">
                {carts.map((cart, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col res_xxm:flex-row gap-5  mb-5 w-full bg-gray-200 rounded-lg p-4"
                    >
                      <div className="relative self-center shrink-0 w-[130px] sm:w-[200px] aspect-[3/2] overflow-hidden bg-blue-gray-600 ">
                        <Image src={`${cart.image}`} alt="product image" />
                      </div>

                      <div className="flex justify-between w-full">
                        <div className="flex flex-col justify-between">
                          <h1 className="text-[15px] res_xxm:text-[18px] res_xm:text-[22px] font-[500] line-clamp-1 res_xxm:line-clamp-2">
                            {cart.name} Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Molestias, id.
                          </h1>
                          <p className=" text-[11px] res_xxm:text-[14px] res_xm:text-[18px]">
                            Price: Rs. {cart.price}
                          </p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <button
                            onClick={() => dispatch(removeCart(i))}
                            title="Remove Item"
                          >
                            {" "}
                            <i className="fa-solid fa-trash-can text-red-400 text-[20px]"></i>{" "}
                          </button>

                          <div className="font-normal whitespace-nowrap text-[11px] res_xxm:text-[14px] md:text-[18px]">
                            Qty:{"  "}
                            <select
                              value={cart.qty}
                              onChange={(e) => {
                                dispatch(
                                  addOrUpdateCart({
                                    name: cart.name,
                                    qty: Number(e.target.value),
                                    image: cart.image,
                                    price: cart.price,
                                    product: cart.product,
                                    countInStock: cart.countInStock,
                                  })
                                );
                              }}
                              className="p-2"
                              name=""
                              id=""
                            >
                              {[...Array(cart.countInStock).keys()].map(
                                (v, i) => {
                                  return (
                                    <option key={i} value={v + 1}>
                                      {v + 1}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>
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
                    <tr className="">
                      <td className=" p-2 text-start">
                        <p className="font-normal">SubTotal</p>
                      </td>
                      <td className="text-center">
                        <p className="font-normal">{carts.length}</p>
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 text-start ">
                        <p className="font-normal">Total Price</p>
                      </td>
                      <td className="text-center">
                        <p className="font-normal">Rs.{total}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-start">
                        <p className="font-normal">Status</p>
                      </td>
                      <td className="text-center">
                        <p className="font-normal">Cash On Delivery</p>
                      </td>
                    </tr>

                    <tr className="text-center ">
                      <td colSpan={2}>
                        <Button
                          onClick={() => {
                            if (user.shippingAddress.isEmpty) {
                              nav("/user/shipping");
                            } else {
                              nav("/user/checkout");
                            }
                          }}
                          className=" w-full mt-5 py-4"
                        >
                          Proceed To CheckOut
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </ContentWrapper>
    </div>
  );
};
export default CartPage;
