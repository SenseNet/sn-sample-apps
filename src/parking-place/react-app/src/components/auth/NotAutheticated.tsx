import { useNavigate } from "react-router-dom";

export const NotAuthenticatedOverride = () => {
  const navigate = useNavigate();

  navigate("/");

  return null;
};
