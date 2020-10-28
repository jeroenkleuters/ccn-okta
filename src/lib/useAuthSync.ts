// src/lib/useAuthSync.ts
import { useEffect } from "react";
// @ts-ignore
import { useOktaAuth } from "@okta/okta-react";

export function useAuthSync() {
  const { authState } = useOktaAuth();

  useEffect(() => {
    // console.log(authState);
    if (!authState.isPending && authState.isAuthenticated) {
      console.log("TODO: login logic");
    } else if (!authState.isPending && authState.isAuthenticated) {
      console.log("TODO: logout logic");
    }
  }, [authState]);
}
