import React, { ReactNode } from "react";
import {
  AuthenticationProvider,
  useOidcAuthentication,
} from "@sensenet/authentication-oidc-react";
import { Repository } from "@sensenet/client-core";
import { RepositoryContext } from "@sensenet/hooks-react";
import { configuration, repositoryUrl } from "../../utils/configurations";
import { BrowserRouter, useHistory } from "react-router-dom";

type contextProps = {
  children: ReactNode;
};

export function AppProviders({ children }: contextProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RepositoryProvider>{children}</RepositoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export const AuthProvider = ({ children }: contextProps) => {
  const history = useHistory();
  return (
    <AuthenticationProvider configuration={configuration} history={history}>
      {children}
    </AuthenticationProvider>
  );
};
export const RepositoryProvider = ({ children }: contextProps) => {
  const { oidcUser } = useOidcAuthentication();

  return (
    <RepositoryContext.Provider
      value={
        new Repository({ repositoryUrl, token: oidcUser?.access_token || "" })
      }
    >
      {children}
    </RepositoryContext.Provider>
  );
};
