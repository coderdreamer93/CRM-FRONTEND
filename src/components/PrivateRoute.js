import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../components/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext); // Get auth token from context

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
