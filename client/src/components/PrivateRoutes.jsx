import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoutes = (props) => {
  const { isLoadingUser, user } = useAuth();
  console.log('im in private routes and user is', user)

  if (isLoadingUser) return <p>Loading...</p>;

  console.log('user: ', user)

  // return user ? <Outlet /> : <Navigate to='/asdasdsa' replace />;
  return user ? <Outlet /> : <Navigate to={props.redirectTo} replace />;
};

export default PrivateRoutes;