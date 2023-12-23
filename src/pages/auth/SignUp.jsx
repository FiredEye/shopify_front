import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRegisterUserMutation } from "../../features/authApi";
import ContentWrapper from "../../components/ContentWrapper";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userRegistration] = useRegisterUserMutation();
  const registerSchema = Yup.object().shape({
    fullname: Yup.string().min(5).max(20).required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(5).max(20).required("Required"),
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

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      profile_image: null,
      password: "",
      preview: null,
    },
    onSubmit: async (val) => {
      try {
        setIsLoading(true);
        const fileName = `${uuidv4()}.${val.profile_image.name
          .split(".")
          .pop()}`;
        const storageRef = ref(storage, "profiles/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, val.profile_image);
        uploadTask.then(() => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            let formData = new FormData();
            formData.append("fullname", val.fullname);
            formData.append("email", val.email);
            formData.append("password", val.password);
            formData.append("profile_image", downloadURL);
            const response = await userRegistration(formData).unwrap();

            setIsLoading(false);
            toast.success("User registered sucessfully.");
            formik.resetForm();
            nav("/login");
          });
        });
      } catch (err) {
        setIsLoading(false);
        toast.error(err.data);
      }
    },
    validationSchema: registerSchema,
  });

  return (
    <ContentWrapper>
      <Card
        color="transparent"
        shadow={false}
        className="mx-auto max-w-xl my-5 space-y-9 text-black"
      >
        <Typography variant="h4" className="">
          SignUp Form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="fullname"
              onChange={formik.handleChange}
              value={formik.values.fullname}
              size="lg"
              label="UserName"
              autoComplete="off"
            />

            {formik.errors.fullname && formik.touched.fullname && (
              <h1 className="text-pink-700">{formik.errors.fullname}</h1>
            )}

            <Input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              size="lg"
              label="Email"
              autoComplete="off"
            />

            {formik.errors.email && formik.touched.email && (
              <h1 className="text-pink-700">{formik.errors.email}</h1>
            )}
            <div>
              <p>Set Profile</p>
              <input
                name="profile_image"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  formik.setFieldValue("profile_image", file);
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
                <h1 className="mt-2 text-red-600">
                  {formik.errors.profile_image}
                </h1>
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
            <Input
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              size="lg"
              label="Password"
            />
            {formik.errors.password && formik.touched.password && (
              <h1 className="text-pink-700">{formik.errors.password}</h1>
            )}
          </div>

          {isLoading ? (
            <Button type="submit" className="mt-6" fullWidth>
              <div className="h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto "></div>
            </Button>
          ) : (
            <Button type="submit" className="mt-6 h-[52px] " fullWidth>
              Submit
            </Button>
          )}

          <Typography className="mt-4 text-center font-normal">
            Already have an account ?{" "}
            <button type="button" onClick={() => nav(-1)}>
              {" "}
              <h1 className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                Login
              </h1>
            </button>
          </Typography>
        </form>
      </Card>
    </ContentWrapper>
  );
};

export default SignUp;
