import { Textarea } from "@material-tailwind/react";

import { Button, Rating, Typography, Avatar } from "@material-tailwind/react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useReviewProductMutation } from "../features/productApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Review = ({ product }) => {
  const reviewSchema = Yup.object().shape({
    comment: Yup.string().min(10).max(200).required("Required"),
    rating: Yup.string().required("Required"),
  });
  const { user } = useSelector((store) => store.userInfo);

  const nav = useNavigate();

  const [addReview, { isLoading, isError }] = useReviewProductMutation();

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    onSubmit: async (val) => {
      try {
        const response = await addReview({
          body: {
            comment: val.comment,
            rating: val.rating,
          },
          id: product._id,
          token: user.token,
        }).unwrap();

        toast.success(response);
        formik.resetForm();
      } catch (err) {
        toast.error(err.data.message);
        formik.resetForm();
      }
    },
    validationSchema: reviewSchema,
  });
  return (
    <div className="p-5 lg:col-span-3 flex flex-col gap-3">
      <div className="w-full">
        <h1 className="text-[28px] font-bold">{product.numReviews} Reviews</h1>
        {user && !user.isAdmin && (
          <>
            <h1 className="text-lg font-semibold tracking-wider my-2">
              Add Reviews
            </h1>

            <form onSubmit={formik.handleSubmit} className="space-y-4 ">
              <div className="w-full">
                <Textarea
                  name="comment"
                  label="Comment"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                />
                {formik.errors.comment && formik.touched.comment && (
                  <h1 className="text-pink-700">{formik.errors.comment}</h1>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Typography>Rate this item</Typography>
                <Rating
                  name="rating"
                  value={formik.values.rating}
                  onChange={(v) => formik.setFieldValue("rating", v)}
                />
                {formik.errors.rating && formik.touched.rating && (
                  <h1 className="text-pink-700">{formik.errors.rating}</h1>
                )}
              </div>
              {isLoading ? (
                <Button
                  type="submit"
                  disabled
                  className="mt-6 relative py-2 flex justify-center  w-[200px] "
                >
                  <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
                </Button>
              ) : (
                <Button type="submit" className="mt-6 w-[200px]">
                  Submit
                </Button>
              )}
            </form>
          </>
        )}
      </div>
      <div className="my-7 border-y-1">
        <h1 className="text-[18px] font-bold text-center">Recent Reviews</h1>
      </div>
      <div>
        {[...product.reviews]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((review) => {
            return (
              <div
                key={review._id}
                className="w-full border-[1px] border-gray-400 p-3 mb-3 flex gap-3 rounded-md"
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src={`${review.user_info?.profile_image}`}
                  alt="tania andrew"
                />

                <div className="flex w-full flex-col ">
                  <div className="flex gap-2 items-center ">
                    <Typography variant="h5" color="blue-gray">
                      {review.user_info?.fullname}
                    </Typography>
                    <p className="text-[12px] text-gray-600">
                      {dayjs(review.createdAt).format("MMM D, YYYY")}
                    </p>
                  </div>

                  <p className="line-clamp-3">{review.comment}</p>
                  <Rating
                    value={review.rating}
                    readonly
                    className="text-[6px]"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Review;
