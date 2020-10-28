import { State, Action } from "./types";

const initialState: State = {
  user: {
    id: 4,
    name: "Kelley van Evert",
    email: "kelley@codaisseur.com",
  },
  homepageFeed: {},
  darkMode: false,
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "toggle_dark_mode": {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }
    case "homepage_feed_fetching": {
      return {
        ...state,
        homepageFeed: {
          ...state.homepageFeed,
          [action.payload.tag]: {
            status: "loading",
          },
        },
      };
    }
    case "homepage_feed_fetched": {
      return {
        ...state,
        homepageFeed: {
          ...state.homepageFeed,
          [action.payload.tag]: {
            status: "success",
            data: action.payload.data,
          },
        },
      };
    }
    case "homepage_feed_error": {
      return {
        ...state,
        homepageFeed: {
          ...state.homepageFeed,
          [action.payload.tag]: {
            status: "error",
            error: action.payload,
          },
        },
      };
    }
    case "login": {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    case "logout": {
      const { token, user, ...rest } = state;
      return rest;
    }
    default: {
      return state;
    }
  }
}
