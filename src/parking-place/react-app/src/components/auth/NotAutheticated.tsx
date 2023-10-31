import { useNavigate } from "react-router-dom";

export const NotAuthenticatedOverride = () => {
  const navigate = useNavigate();

  console.log("NotAuthenticatedOverride");

  navigate("/");

  return null;
};
