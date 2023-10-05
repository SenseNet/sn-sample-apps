import React from "react";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

function Home() {
  const { oidcUser } = useOidcAuthentication();

  console.log(oidcUser);

  return (
    <div className="App">
      <header className="App-header">
        <p>Parking Place - React App comming soon!</p>
      </header>
    </div>
  );
}

export default Home;
