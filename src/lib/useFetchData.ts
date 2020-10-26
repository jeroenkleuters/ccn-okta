import { useState } from "react";
import axios from "axios";

import { FetchState } from "../util/fetchstate";
import { PostsResponse } from "../lib/model";

export function useFetchData(
  url: string
): [() => void, FetchState<PostsResponse>] {
  const [state, setState] = useState<FetchState<PostsResponse>>({
    status: "idle",
  });

  const fetchData = async () => {
    setState({ status: "loading" });
    try {
      const res = await axios.get(url);
      setState({ status: "success", data: res.data });
    } catch (error) {
      setState({ status: "error", error });
    }
  };

  return [fetchData, state];
}
