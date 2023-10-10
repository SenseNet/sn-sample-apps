export const repositoryUrl = "https://sampleapps.test.sensenet.cloud";

export const configuration = {
  client_id: "TdDZR9am6OVoYQgZ", // clientID of your repository
  automaticSilentRenew: true,
  redirect_uri: `${window.location.origin}/authentication/callback`,
  response_type: "code",
  post_logout_redirect_uri: `${window.location.origin}/`,
  scope: "openid profile sensenet",
  authority: "https://sampleapps-is.test.sensenet.cloud",
  silent_redirect_uri: `${window.location.origin}/authentication/silent_callback`,
  extraQueryParams: { snrepo: repositoryUrl },
};
