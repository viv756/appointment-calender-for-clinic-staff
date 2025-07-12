import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.provider";

const ProtectedRoute = ({children}) => {
  const { isAuthenticated } = useAuthContext()
  
  if (!isAuthenticated) {
    return <Navigate to={"/"} replace/>
  }

  return children
};

export default ProtectedRoute;
