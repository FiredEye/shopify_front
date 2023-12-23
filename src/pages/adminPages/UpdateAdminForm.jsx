import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { useAdminUpdateMutation } from "../../features/authApi";
import { toast } from "react-toastify";
import { adminUpdate } from "../../features/userSlice";
import { useState } from "react";

const UpdateAdminForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [update] = useAdminUpdateMutation();
  const [isImage, setIsImage] = useState(false);

  const alwaysValidateSchema = Yup.object().shape({
    fullname: Yup.string().min(5).max(20).required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
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
      email: user?.email,
      profile_image: null,
      preview: `${user.profile_image}`,
    },
    onSubmit: async (val) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("fullname", val.fullname);
        formData.append("email", val.email);

        if (val.profile_image && user.profile_image) {
          const url = new URL(user.profile_image);

          const pathWithQuery = decodeURIComponent(url.pathname);
          const pathAfterO = pathWithQuery.split("/o/")[1];

          const desertRef = ref(storage, pathAfterO);

          // Delete the file
          try {
            // Delete the file
            await deleteObject(desertRef);
          } catch (deleteError) {
            console.error("Error deleting file:", deleteError);
            // Handle the error or log as needed
          }
          const fileName = `${uuidv4()}.${val.profile_image.name
            .split(".")
            .pop()}`;
          const storageRef = ref(storage, "profiles/" + fileName);
          try {
            const uploadTask = uploadBytesResumable(
              storageRef,
              val.profile_image
            );
            await uploadTask;

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            formData.append("profile_image", downloadURL);
          } catch (uploadError) {
            console.error("Error uploading file:", uploadError);
          }
        }
        const response = await update({
          body: formData,
          token: user.token,
        }).unwrap();

        if (response) {
          dispatch(
            adminUpdate({
              fullname: response.fullname,
              email: response.email,
              profile_image: response.profile_image,
            })
          );
          toast.success("User details updated!");
        }
        setIsLoading(false);
        setIsImage(false);
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
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            size="lg"
            label="Email"
          />
          {formik.errors.email && formik.touched.email && (
            <h1 className="text-pink-700">{formik.errors.email}</h1>
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
export default UpdateAdminForm;
