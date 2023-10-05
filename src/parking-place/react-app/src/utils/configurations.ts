export const repositoryUrl = "https://sn6268333030.sensenet.cloud";

export const configuration = {
  client_id: "MInyow6lMsNpmjHL", // clientID of your repository
  automaticSilentRenew: true,
  redirect_uri: `${window.location.origin}/authentication/callback`,
  response_type: "code",
  post_logout_redirect_uri: `${window.location.origin}/`,
  scope: "openid profile sensenet",
  authority: "https://sn6268333030-is.sensenet.cloud",
  silent_redirect_uri: `${window.location.origin}/authentication/silent_callback`,
  extraQueryParams: { snrepo: "https://sn6268333030.sensenet.cloud" },
};
