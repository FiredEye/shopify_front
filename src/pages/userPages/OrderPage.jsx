import { useNavigate } from "react-router";
import { Button, Card } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../../features/orderApi";
import { clearCartItem } from "../../features/userSlice";
import { toast } from "react-toastify";
import ContentWrapper from "../../components/ContentWrapper";

const OrderPage = () => {
  const { carts, user } = useSelector((store) => store.userInfo);
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const total = carts.reduce((a, b) => {
    return a + b.qty * b.price;
  }, 0);

  const nav = useNavigate();

  const dispatch = useDispatch();
  const orderAdd = async (totalPrice, orderItems) => {
    try {
      const response = await addOrder({
        body: {
          totalPrice,
          orderItems,
          shippingAddress: user.shippingAddress,
        },
        token: user.token,
      }).unwrap();
      dispatch(clearCartItem());
      toast.success(response);
      nav("/", { replace: true });
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <ContentWrapper>
      <Card
        color="transparent"
        shadow={false}
        className="mx-auto max-w-xl mt-5 space-y-9 text-black items-center"
      >
        <div className="flex flex-col gap-3 items-center">
          <p className="text-[26px] font-bold">Delivery Address:</p>
          <p className="text-[18px] font-semibold">
            {user.shippingAddress.address}, {user.shippingAddress.city}
          </p>

          <p className="text-[20px] font-semibold">Total Amount: Rs {total}</p>
        </div>
        {isLoading ? (
          <Button type="submit" className="mt-6 max-w-lg" fullWidth>
            <div className="h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto "></div>
          </Button>
        ) : (
          <Button
            onClick={() => orderAdd(total, carts)}
            className="mt-6 max-w-lg py-[18px]"
            fullWidth
          >
            CheckOut
          </Button>
        )}
      </Card>
    </ContentWrapper>
  );
};
export default OrderPage;
