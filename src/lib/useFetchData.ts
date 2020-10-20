// src/lib/useFetchData.ts
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { FetchState } from "../util/fetchstate";
import { FetchDataCacheContext } from "./fetchDataCache";

export default function useFetchData<Data>(
  url: string
): FetchState<Data> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<Data>>({
    status: "loading",
  });

  const { getResultsForUrl, addItem, removeItem } = useContext(
    FetchDataCacheContext
  );

  const cachedItem = getResultsForUrl(url);

  useEffect(() => {
    if (cachedItem) {
      setState({ status: "success", data: cachedItem.data });
    } else {
      (async () => {
        setState({ status: "loading" });
        try {
          const res = await axios.get(url);
          // setState no longer necessary here: it will happen
          //  automatically when the cachedItem is found
          addItem(url, res.data);
        } catch (error) {
          setState({ status: "error", error });
        }
      })();
    }
  }, [url, cachedItem, addItem]);
  // ^^ This dependencies array says: re-run the effect...
  //    - whenever the url changes
  //    - or when the cachedItem changes
  //    - or when addItem changes. That won't ever happen due to our
  //       use of useCallback, but it still is important to add it
  //       (and specifically to make addItem use useCallback so as to
  //        be independent of the render state)

  const refetch = () => {
    removeItem(url);
  };

  return { ...state, refetch };
}
