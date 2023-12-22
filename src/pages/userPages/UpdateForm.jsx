import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserUpdateMutation } from "../../features/authApi";
import { toast } from "react-toastify";
import { userUpdate } from "../../features/userSlice";
import { useState } from "react";

const UpdateForm = () => {
  const [update, { isLoading }] = useUserUpdateMutation();
  const [isImage, setIsImage] = useState(false);

  const alwaysValidateSchema = Yup.object().shape({
    fullname: Yup.string().min(5).max(20).required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().min(5).max(20).required("Required"),
  });
  const conditionalValidateSchema = Yup.object().shape({
    profile_image: Yup.mixed()
      .test(
        "fileType",
        "Invalid file type",
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      )
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 10 * 1024 * 1024
      ),
  });

  const { user } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullname: user?.fullname,
      address: user?.shippingAddress.address,
      city: user?.shippingAddress.city,
      profile_image: null,
      preview: `${user.profile_image}`,
    },
    onSubmit: async (val) => {
      let formData = new FormData();
      formData.append("fullname", val.fullname);
      formData.append("address", val.address);
      formData.append("city", val.city);
      formData.append("isEmpty", false);

      try {
        if (formik.values.profile_image !== null) {
          formData.append("profile_image", val.profile_image);
          formData.append("old_imgPath", user.profile_image);
        }
        const response = await update({
          body: formData,
          token: user.token,
        }).unwrap();
        if (response) {
          dispatch(
            userUpdate({
              fullname: response.fullname,
              shippingAddress: response.shippingAddress,
              profile_image: response.profile_image,
            })
          );
          toast.success("User details updated!");
          setIsImage(false);
        }
      } catch (err) {
        toast.error(err.data);
      }
    },
    validationSchema: isImage
      ? Yup.object().shape({
          ...alwaysValidateSchema.fields,
          ...conditionalValidateSchema.fields,
        })
      : alwaysValidateSchema,
  });

  return (
    <Card color="transparent" shadow={false} className="w-full md:col-span-2">
      <Typography
        variant="h4"
        color="blue-gray"
        className="border-[gray] border-b-2 pb-1"
      >
        Profile
      </Typography>

      <form onSubmit={formik.handleSubmit} className="mt-4 mb-2 ">
        <p className="mb-4 text-green-500 text-[12px] italic">
          ** you can change the following fileds: **
        </p>
        <div className="mb-4 flex flex-col gap-6">
          <Input
            name="fullname"
            onChange={formik.handleChange}
            value={formik.values.fullname}
            type="text"
            size="lg"
            label="Username"
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <h1 className="text-pink-700">{formik.errors.fullname}</h1>
          )}
        </div>

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
        <div>
          <p>Set Profile</p>
          <input
            name="profile_image"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue("profile_image", file);
              setIsImage(true);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.addEventListener("load", () => {
                formik.setFieldValue("preview", reader.result);
              });
            }}
            type="file"
            accept="image/*"
          />
          {formik.errors.profile_image && formik.touched.profile_image ? (
            <h1 className="mt-2 text-red-600">{formik.errors.profile_image}</h1>
          ) : null}
          <div className="border border-gray-600 h-[400px] my-1 w-full">
            {formik.values.preview !== null && (
              <img
                src={formik.values.preview}
                alt="profile image"
                className="object-cover h-full w-full"
              />
            )}
          </div>
        </div>
        {isLoading ? (
          <Button type="submit" className="mt-6" fullWidth>
            <div className="h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto "></div>
          </Button>
        ) : (
          <Button type="submit" className="mt-6" fullWidth>
            Update
          </Button>
        )}
      </form>
    </Card>
  );
};
export default UpdateForm;
