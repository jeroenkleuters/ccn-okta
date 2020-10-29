// src/config.ts
import React, { useCallback, useState, useContext } from "react";
import axios from "axios";

// @ts-ignore
import { OktaAuth, OktaAuthOptions, OAuthError } from "@okta/okta-auth-js";
import { useEffect, createContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/types";

export const oktaConfig = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  redirectUri: "http://localhost:3000/implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  // disableHttpsCheck: undefined,
};

const config: OktaAuthOptions = {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: "http://localhost:3000/implicit/callback",
};

type Props = {
  children?: React.ReactNode;
};

const MyOktaContext = createContext<any>(null);

export function MyOktaAuthProvider({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [authClient] = useState<OktaAuth>(() => new OktaAuth(config));

  useEffect(() => {
    async function tryLoginWithToken(token: string) {
      try {
        const res = await axios.get(
          "https://codaisseur-coders-network-okta.herokuapp.com/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({
          type: "login",
          payload: {
            token,
            user: res.data,
          },
        });
      } catch (error) {
        console.log("dunno yet what to do", error);
        dispatch({
          type: "logout",
        });
      }
    }

    (async () => {
      if (authClient.token.isLoginRedirect()) {
        const data = await authClient.token.parseFromUrl();
        const { accessToken, idToken } = data.tokens;
        authClient.tokenManager.add("idToken", idToken!);
        tryLoginWithToken(accessToken?.accessToken!);
      } else {
        try {
          const tokenResponse = await authClient.token.getWithoutPrompt({
            responseType: "id_token",
          });
          if (tokenResponse.tokens.accessToken) {
            tryLoginWithToken(tokenResponse.tokens.accessToken.accessToken);
          }
        } catch (error) {
          if (error instanceof OAuthError) {
            // niks aan de hand
          } else {
            throw error;
          }
        }
        dispatch({
          type: "logout",
        });
      }
    })();
  }, [dispatch, authClient]);

  const loginRedirect = useCallback(() => {
    // TODO is this the right way?
    authClient.token.getWithRedirect();
  }, [authClient]);

  const logout = useCallback(() => {
    // TODO also dispatch a logout action I think
    authClient.signOut();
  }, [authClient]);

  return (
    <MyOktaContext.Provider
      value={{
        authClient,
        logout,
        loginRedirect,
      }}
    >
      {children}
    </MyOktaContext.Provider>
  );
}

export function useMyOkta() {
  return useContext(MyOktaContext);
}
