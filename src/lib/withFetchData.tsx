// src/lib/withFetchData.ts
import React, { useState, useEffect } from "react";
import axios from "axios";

import { FetchState } from "../util/fetchstate";

/**
 * Usage:
 *
 * ```tsx
 * const url = "https://codaisseur-coders-network-okta.herokuapp.com/posts";
 *
 * export default withFetchData<PostsResponse>(url)(
 *   function HomePage({ fetchState }) {
 *     return <div>...</div>;
 *   }
 * );
 * ```
 */
export default function withFetchData<Data>(url: string) {
  return function hoc<P>(
    Wrapped: React.FC<P & { fetchState: FetchState<Data> }>
  ) {
    return function HocWrapperComponent(props: P) {
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
      }, []);

      return <Wrapped {...props} fetchState={state} />;
    };
  };
}
