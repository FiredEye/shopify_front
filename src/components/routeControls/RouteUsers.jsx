import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RouteUsers = () => {
  const { user } = useSelector((store) => store.userInfo);

  return user === null ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default RouteUsers;
