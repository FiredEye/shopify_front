import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../features/productApi";
import EditForm from "./EditForm";

const EditProduct = () => {
  const { id } = useParams();

  const { user } = useSelector((store) => store.userInfo);

  const { data, isLoading, error } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <>Loading...</>;
  }
  return <>{data && <EditForm product={data} />}</>;
};

export default EditProduct;
