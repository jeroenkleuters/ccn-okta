export type FetchState<Data> =
  | {
      status: "idle";
    }
  | {
      status: "loading";
    }
  | {
      status: "success";
      data: Data;
    }
  | {
      status: "error";
      error: any;
    };
