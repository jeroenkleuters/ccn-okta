import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";

import { useFetchData } from "./useFetchData";

const url = "https://codaisseur-coders-network-okta.herokuapp.com/posts";

// 1. gewoon een browser openen, en dan dit in de browser, in een react component doen
// 2. een "fake dom" implementation importeren (jsdom), en dan met react-dom in een react component doen
// 3. `react-test-renderer` gebruiken (under the hood)
//    - @testing-library/react
//    - @testing-library/react-hooks

jest.mock("axios");

test("dummy", async () => {
  (axios.get as any).mockImplementation(async () => {
    await new Promise((r) => setTimeout(r, 10));
    return {
      data: {
        count: 2,
        rows: ["A", "B"],
      },
    };
  });

  const { result, waitForNextUpdate } = renderHook(() => useFetchData(url));

  expect(result.current[1].status).toBe("idle");

  await act(async () => {
    result.current[0]();
  });

  expect(result.current[1].status).toBe("loading");

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(result.current[1].status).toBe("success");
});
