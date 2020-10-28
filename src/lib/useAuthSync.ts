// src/lib/useAuthSync.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// @ts-ignore
import { useOktaAuth } from "@okta/okta-react";

import { AppDispatch } from "../store/types";
import { fetchProfile } from "../store/auth/actions";

export function useAuthSync() {
  const { authState } = useOktaAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // console.log(authState);
    if (!authState.isPending && authState.isAuthenticated) {
      dispatch(fetchProfile(authState.accessToken));
    } else if (!authState.isPending && authState.isAuthenticated) {
      console.log("TODO: logout logic");
    }
  }, [dispatch, authState]);
}
