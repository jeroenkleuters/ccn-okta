import { State, Action } from "./types";

const initialState: State = {
  user: {
    id: 4,
    name: "Kelley van Evert",
    email: "kelley@codaisseur.com",
  },
  homepageFeed: [
    makeFakePost(
      1,
      "Clean up your GitHub profile!",
      "Cleaning up your GitHub profile, and writing good commit messages, can show your future employees that you're a good team player!"
    ),
    makeFakePost(
      2,
      "A helper hook to remember values by deep equality",
      'So of course every React hook enthusiast will have had a use-case for a deep (structural) equality check on the dependencies argument, at a certain point in time. Instead of crafting these things every time you need them, or importing a helper library, here\'s a wonderfully simple helper hook to help you out: ```ts import { useRef } from "react"; import isEqual from "react-fast-compare"; export default function remember<T>(value: T): T { const ref = useRef<T>(value); if (!isEqual(value, ref.current)) { ref.current = value; } return ref.current; } ``` You can use it like this: ```ts const something = useMemo(expensiveComputation, [ remember(input) ]); ``` Isn\'t that just lovely? :D'
    ),
  ],
};

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case "homepage_feed_fetched": {
      return {
        ...state,
        homepageFeed: action.payload,
      };
    }
    case "login": {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
}

function makeFakePost(id: number, title: string, content: string) {
  return {
    id,
    title,
    content,
    createdAt: "2020-10-06T14:05:05.976Z",
    updatedAt: "2020-10-06T14:05:06.258Z",
    author_id: 2,
    tags: [],
    post_likes: [],
  };
}
