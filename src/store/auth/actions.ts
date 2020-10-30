// src/store/auth/actions.ts

import { ThunkResult, Action } from "../types";
import axios from "axios";

export const fetchProfile = (accessToken: string): ThunkResult => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(
        "https://codaisseur-coders-network-okta.herokuapp.com/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch<Action>({
        type: "login",
        payload: {
          user: res.data,
          token: accessToken,
        },
      });
    } catch (error) {
      // TODO handle this
    }
  };
};
