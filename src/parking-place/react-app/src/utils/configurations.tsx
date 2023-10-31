export const repositoryUrl =
  process.env.REACT_APP_RepoUrl || "https://sampleapps.test.sensenet.cloud";

export const configuration = {
  client_id: process.env.REACT_APP_ClientId || "TdDZR9am6OVoYQgZ", // clientID of your repository
  automaticSilentRenew: true,
  redirect_uri: `${window.location.origin}/authentication/login_callback`,
  response_type: "code",
  post_logout_redirect_uri: `${window.location.origin}/`,
  scope: "openid profile sensenet",
  authority:
    process.env.REACT_APP_Authority ||
    "https://sampleapps-is.test.sensenet.cloud",
  silent_redirect_uri: `${window.location.origin}/authentication/silent_callback`,
  extraQueryParams: { snrepo: repositoryUrl },
};

export const adminUrl = "https://admin.test.sensenet.com/";
