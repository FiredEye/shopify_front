import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useUserUpdateMutation } from "../../features/authApi";
import { userUpdate } from "../../features/userSlice";
import ContentWrapper from "../../components/ContentWrapper";

const Shipping = () => {
  const addressSchema = Yup.object().shape({
    address: Yup.string().required("Required"),
    city: Yup.string().min(5).max(20).required("Required"),
  });

  const nav = useNavigate();
  const dispatch = useDispatch();
  const [updateUser, { isLoading, isError, error, isSuccess }] =
    useUserUpdateMutation();
  const { user } = useSelector((store) => store.userInfo);

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
    },
    onSubmit: async (val) => {
      try {
        const response = await updateUser({
          token: user.token,
          body: {
            address: val.address,
            city: val.city,
            isEmpty: false,
          },
        }).unwrap();
        dispatch(
          userUpdate({
            shippingAddress: {
              address: val.address,
              city: val.city,
              isEmpty: false,
            },
          })
        );

        toast.success(response);
        nav("/user/checkout");
      } catch (err) {
        toast.error(err.data.message);
      }
    },
    validationSchema: addressSchema,
  });

  return (
    <ContentWrapper>
      <Card
        color="transparent"
        shadow={false}
        className="mx-auto max-w-xl my-5 space-y-9"
      >
        <Typography variant="h4" color="blue-gray">
          Address Form
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
              size="lg"
              label="Address"
            />

            {formik.errors.address && formik.touched.address && (
              <h1 className="text-pink-700">{formik.errors.address}</h1>
            )}

            <Input
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
              size="lg"
              label="City"
            />
            {formik.errors.city && formik.touched.city && (
              <h1 className="text-pink-700">{formik.errors.city}</h1>
            )}
          </div>

          {isLoading ? (
            <Button type="submit" className="mt-6" fullWidth>
              <div className="h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto "></div>
            </Button>
          ) : (
            <Button type="submit" className="mt-6" fullWidth>
              Submit
            </Button>
          )}
        </form>
      </Card>
    </ContentWrapper>
  );
};

export default Shipping;
