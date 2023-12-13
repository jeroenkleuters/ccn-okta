// src/lib/useFetchData.ts
import { useEffect, useState } from "react";

import { FetchState } from "../util/fetchstate";
import axios from "axios";

export default function useFetchData<Data>(url: string) {
  const [state, setState] = useState<FetchState<Data>>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      try {
        const res = await axios.get(url);
        setState({ status: "success", data: res.data });
      } catch (error) {
        setState({ status: "error", error });
      }
    })();
  }, [url]);

  return state;
}
