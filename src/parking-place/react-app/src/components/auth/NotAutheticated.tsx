import { useEffect } from "react";

export const NotAuthenticatedOverride = () => {
  useEffect(() => {
    console.log("Redirecting");
    window.location.replace("/");
  }, []);

  return null;
};
