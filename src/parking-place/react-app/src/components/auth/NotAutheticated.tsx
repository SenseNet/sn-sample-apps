import { useEffect } from "react";
import { redirect } from "react-router";

export const NotAuthenticatedOverride = () => {
  useEffect(() => {
    redirect("/");
  }, []);

  return null;
};
