import { redirect } from "react-router";

export const NotAuthenticatedOverride = () => {
  redirect("/");

  return null;
};
