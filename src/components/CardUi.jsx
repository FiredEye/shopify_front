import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import Image from "./lazyLoadImage/Image";

const CardUi = ({ product }) => {
  const nav = useNavigate();
  return (
    <Card
      className="mb-[20px] flex flex-col gap-[14px] cursor-pointer rounded-lg hover:shadow-gray-600 hover:shadow-lg bg-gray-200  h-fit"
      title={product.product_name}
      onClick={() => nav(`/productDetail/${product._id}`)}
    >
      <CardHeader
        color="blue-gray"
        className="relative h-56 aspect-[3/2] shrink-0"
      >
        <Image src={`${product.product_image}`} alt="product image" />
      </CardHeader>
      <CardBody>
        <p className="text-[22px] font-semibold mb-2 line-clamp-1">
          {product.product_name}
        </p>
        <p className="md:h-[52px] line-clamp-1 sm:line-clamp-2 mb-1">
          {product.product_detail}
        </p>

        <div>
          <div className="flex justify-between">
            <Rating value={product.rating} readonly />
            <h1> Reviews: {product.numReviews}</h1>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className=" text-white bg-gray-800 hover:bg-black transition-all">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardUi;
