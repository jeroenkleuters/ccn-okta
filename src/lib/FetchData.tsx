// src/lib/withFetchData.ts
import React, { useState, useEffect } from "react";
import axios from "axios";

import { FetchState } from "../util/fetchstate";

type FetchDataProps<Data> = {
  url: string;
  children: (fetchState: FetchState<Data>) => JSX.Element;
};

/**
 * Usage:
 *
 * ```tsx
 * const url = "https://codaisseur-coders-network-okta.herokuapp.com/posts";
 *
 * <FetchData url={url}>
 *   {fetchState => {
 *     return <div>...</div>;
 *   }}
 * </FetchData>
 * ```
 */
export default function FetchData<Data>({
  url,
  children,
}: FetchDataProps<Data>) {
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

  return children(state);
}
