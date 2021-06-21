import { act, renderHook } from "@testing-library/react-hooks";
import fetchMock from "fetch-mock-jest";
import { WritableStream } from "web-streams-polyfill";
import { useFetchFavicons } from "./useFetchFavicons";
import { Domain } from "./useParseDomainsList";

/**
 * I can't mock a ReadableStream properly :(
 *
 * We get an error related to circular refs, so I just test for that.
 */
test("loads a list of favicons", async () => {
  const writable = new WritableStream();
  const writer = writable.getWriter();
  writer.write(
    '{"number":1,"domain":"google.com","favicon":"https://google.com/favicon.ico"}\n\n\n'
  );
  writer.write(
    '!END!{"successfulCount":22,"unsuccessfulCount":3,"timeElapsed":20780.777875}'
  );
  fetchMock.post("/api/favicons", writable);
  const domainsList: Domain[] = [{ domain: "google.com", number: 1 }];
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchFavicons(domainsList)
  );
  const [faviconsList, fetchData, isLoading, fetchingError] = result.current;

  expect(faviconsList).toHaveLength(0);
  expect(isLoading).toBeFalsy();
  expect(fetchingError).toBeUndefined();
  act(() => {
    fetchData();
  });
  await waitForNextUpdate();
  expect(result.current[3]?.message).toMatch(/Failed to fetch favicon data/);
});
