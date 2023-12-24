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
      className="mb-[20px] flex flex-col gap-[8] res_xm:gap-[14px] cursor-pointer rounded-lg hover:shadow-gray-600 hover:shadow-lg bg-gray-200  h-fit "
      title={product.product_name}
      onClick={() => nav(`/productDetail/${product._id}`)}
    >
      <CardHeader
        color="blue-gray"
        className="relative h-24 res_xxm:h-36 res_xm:h-56 aspect-[1.7/1.1] res_xxm:aspect-[2/1.2] res_xm:aspect-[3/2] shrink-0"
      >
        <Image src={`${product.product_image}`} alt="product image" />
      </CardHeader>
      <CardBody>
        <p className="text-[16px] res_xm:text-[22px] font-semibold mb-2 line-clamp-1 mt-[-10px] res_xm:mt-[-20px]">
          {product.product_name}
        </p>
        <p className="text-[12px] res_xm:text-[16px] md:h-[52px] line-clamp-1 sm:line-clamp-2 mb-1">
          {product.product_detail}
        </p>

        <div>
          <div className="flex justify-between">
            <Rating value={product.rating} readonly className="cardUiStar" />
            <h1 className=" text-[11px] res_xxm:text-[12px] res_xm:text-[16px] hidden res_xm:block">
              {" "}
              Reviews: {product.numReviews}
            </h1>
          </div>
        </div>
        <Button className="mt-3 text-white bg-gray-800 hover:bg-black transition-all text-[12px] res_xm:text-[16px] w-fit">
          Read More
        </Button>
      </CardBody>
    </Card>
  );
};

export default CardUi;
