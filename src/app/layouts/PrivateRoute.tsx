 import { Navigate } from "react-router-dom";
 import URL from "@/constants/url";

 interface PrivateRouteProps {
  children: React.ReactNode;
 }

 const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={URL.Login} replace />
  }
 
  return <>{children}</>
 }
 export default PrivateRoute;